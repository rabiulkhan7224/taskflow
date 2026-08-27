import { useDraggable } from "@dnd-kit/react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  SlidersHorizontal,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { PriorityBadge } from "./PriorityBadge";
import { Status, Task } from "@/types/task";

const people: Record<string, { name: string; image?: string }> = {
  AR: {
    name: "Alex Rivera",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80",
  },
  JM: { name: "Jordan Miller" },
  SK: { name: "Sam Kim" },
};
const columns: { id: Status; label: string; icon: typeof CircleCheck }[] = [
  { id: "todo", label: "To do", icon: Clock3 },
  { id: "in_progress", label: "In progress", icon: SlidersHorizontal },
  { id: "done", label: "Done", icon: CircleCheck },
];

function People({ ids }: { ids: string[] }) {
  return (
    <div className="flex -space-x-2">
      {ids.map((id) => (
        <Avatar key={id} className="size-7 border-2 border-card">
          <AvatarImage src={people[id]?.image} alt={people[id]?.name ?? id} />
          <AvatarFallback>{id}</AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
const TaskCard = ({
  task,
  onOpen,
}: {
  task: Task;
  onOpen: (task: Task) => void;
}) => {
  const drag = useDraggable({ id: task.id });

  return (
    <Card
      ref={drag.ref}
      onClick={() => onOpen(task)}
      className={`cursor-grab transition-shadow hover:shadow-md  ${drag.isDragging ? "opacity-40" : ""}`}
    >
      <CardContent className="flex flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="font-medium leading-5">{task.title}</p>
            <p className="mt-1 line-clamp-2 text-sm leading-5 text-muted-foreground">
              {task.description}
            </p>
          </div>
          <Badge variant="secondary" className="shrink-0 text-[10px]">
            {task.project}
          </Badge>
        </div>
        <div className="flex items-center gap-3">
          <Progress value={task.progress} className="h-1.5" />
          <span className="text-xs text-muted-foreground">
            {task.progress}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PriorityBadge priority={task.priority} />
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="size-3.5" />
              {task.dueDate}
            </span>
          </div>
          {/* <People ids={task.assignees} /> */}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
