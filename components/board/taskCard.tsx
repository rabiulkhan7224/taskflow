"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, Paperclip, CheckSquare } from "lucide-react";
import { useTaskStore } from "@/store/use-task-store";
import { Task } from "@/types/task";

const priorityColors = {
  high: "bg-red-500/10 text-red-600 border-red-200",
  medium: "bg-yellow-500/10 text-yellow-600 border-yellow-200",
  low: "bg-blue-500/10 text-blue-600 border-blue-200",
};

export default function TaskCard({ task }: { task: Task }) {
  const { openTaskDetail } = useTaskStore();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.4 : 1,
  };

  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      onClick={() => openTaskDetail(task)}
      className="active:cursor-grabbing hover:shadow-md transition-shadow bg-card border-border"
    >
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge
            variant="outline"
            className={`capitalize text-xs ${priorityColors[task.priority]}`}
          >
            {task.priority}
          </Badge>
          <span className="text-xs text-muted-foreground font-medium">
            {task.dueDate}
          </span>
        </div>

        <div>
          <h4 className="font-semibold text-sm line-clamp-1 text-card-foreground">
            {task.title}
          </h4>
          <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
            {task.description}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>Progress</span>
            <span>{task.progress}%</span>
          </div>
          <Progress value={task.progress} className="h-1.5" />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t text-muted-foreground text-xs">
          <div className="flex -space-x-2">
            {task.assignees.map((user) => (
              <Avatar
                key={user.id}
                className="h-6 w-6 border-2 border-background"
              >
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-[10px]">
                  {user.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[11px]">
            {task.subtasks.length > 0 && (
              <span className="flex items-center gap-1">
                <CheckSquare className="h-3.5 w-3.5" />
                {completedSubtasks}/{task.subtasks.length}
              </span>
            )}
            {task.comments > 0 && (
              <span className="flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" />
                {task.comments}
              </span>
            )}
            {task.attachments > 0 && (
              <span className="flex items-center gap-1">
                <Paperclip className="h-3.5 w-3.5" />
                {task.attachments}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
