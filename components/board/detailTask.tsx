"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useTaskStore } from "@/lib/task-store";

export default function DetailTask() {
  const { selectedTask, isDetailSheetOpen, closeDetailSheet, toggleSubtask } =
    useTaskStore();

  if (!selectedTask) return null;

  return (
    <Sheet open={isDetailSheetOpen} onOpenChange={closeDetailSheet}>
      <SheetContent className="sm:max-w-lg space-y-6">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {selectedTask.priority} Priority
            </Badge>
            <Badge variant="secondary" className="capitalize">
              {selectedTask.status.replace("_", " ")}
            </Badge>
          </div>
          <SheetTitle className="text-xl pt-2">{selectedTask.title}</SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground">
              Description
            </h4>
            <p className="text-sm mt-1">{selectedTask.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-lg">
            <div>
              <span className="text-xs text-muted-foreground">Project:</span>
              <p className="font-medium">{selectedTask.project}</p>
            </div>
            <div>
              <span className="text-xs text-muted-foreground">Due Date:</span>
              <p className="font-medium">{selectedTask.dueDate}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-medium">Progress</span>
              <span>{selectedTask.progress}%</span>
            </div>
            <Progress value={selectedTask.progress} className="h-2" />
          </div>

          {/* Subtasks Section */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-semibold">
              Subtasks (
              {selectedTask.subtasks.filter((s) => s.completed).length}/
              {selectedTask.subtasks.length})
            </h4>
            <div className="space-y-2">
              {selectedTask.subtasks.map((st) => (
                <div
                  key={st.id}
                  className="flex items-center gap-2 text-sm border p-2 rounded-md"
                >
                  <Checkbox
                    id={st.id}
                    checked={st.completed}
                    onCheckedChange={() =>
                      toggleSubtask(selectedTask.id, st.id)
                    }
                  />
                  <label
                    htmlFor={st.id}
                    className={`cursor-pointer ${
                      st.completed ? "line-through text-muted-foreground" : ""
                    }`}
                  >
                    {st.title}
                  </label>
                </div>
              ))}
              {selectedTask.subtasks.length === 0 && (
                <p className="text-xs text-muted-foreground">
                  No subtasks added.
                </p>
              )}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
