"use client";

import { useDroppable } from "@dnd-kit/core";
import { Badge } from "@/components/ui/badge";
import { type Status, type Task } from "@/lib/task-store";
import TaskCard from "./taskCard";

interface ColumnProps {
  id: Status;
  title: string;
  tasks: Task[];
}

export default function DroppableColumn({ id, title, tasks }: ColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 rounded-xl border p-4 transition-colors ${
        isOver ? "bg-accent/40 border-primary" : "bg-muted/30"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">{title}</h3>
        <Badge variant="secondary" className="rounded-full px-2 text-xs">
          {tasks.length}
        </Badge>
      </div>

      <div className="flex flex-col gap-3 min-h-[350px]">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {tasks.length === 0 && (
          <div className="flex h-32 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
            No tasks in {title.toLowerCase()}
          </div>
        )}
      </div>
    </div>
  );
}
