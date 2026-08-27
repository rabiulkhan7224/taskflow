"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, Edit3, Plus, Save } from "lucide-react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Progress } from "./ui/progress";
import { PriorityBadge } from "./PriorityBadge";
import { Priority, Status, Task } from "@/types/task";

const DetailTask = ({
  task,
  onClose,
  onUpdate,
}: {
  task: Task | null;
  onClose: () => void;
  onUpdate: (id: string, patch: Partial<Task>) => void;
}) => {
  const [editing, setEditing] = useState(false);
  const [subtask, setSubtask] = useState("");

  // Local state for buffered edits
  const [formData, setFormData] = useState<Partial<Task>>({});

  // Sync form data when task changes or edit mode toggles
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
      });
    }
  }, [task, editing]);

  if (!task) return null;

  const completed = task.subtasks.filter((item) => item.completed).length;
  const percent = task.subtasks.length
    ? Math.round((completed / task.subtasks.length) * 100)
    : task.progress;

  const handleSave = () => {
    onUpdate(task.id, formData);
    setEditing(false);
  };

  const addSubtask = () => {
    const title = subtask.trim();
    if (!title) return;

    const newSubtasks = [
      ...task.subtasks,
      { id: `s${Date.now()}`, title, completed: false },
    ];

    const completedCount = newSubtasks.filter((item) => item.completed).length;
    const newPercent = Math.round((completedCount / newSubtasks.length) * 100);

    onUpdate(task.id, {
      subtasks: newSubtasks,
      progress: newPercent,
    });

    setSubtask("");
  };

  const toggleSubtask = (id: string) => {
    const subtasks = task.subtasks.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item,
    );

    const done = subtasks.filter((item) => item.completed).length;
    const newPercent = subtasks.length
      ? Math.round((done / subtasks.length) * 100)
      : task.progress;

    onUpdate(task.id, {
      subtasks,
      progress: newPercent,
    });
  };

  const updateStatus = (status: Status) => {
    const newProgress = status === "done" ? 100 : percent;
    setFormData((prev) => ({ ...prev, status }));
    onUpdate(task.id, { status, progress: newProgress });
  };

  return (
    <Sheet open={Boolean(task)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="flex w-full flex-col overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle>Task Detail</SheetTitle>
            <Button
              variant={editing ? "default" : "outline"}
              size="icon-sm"
              aria-label={editing ? "Save task" : "Edit task"}
              onClick={() => {
                if (editing) {
                  handleSave();
                } else {
                  setEditing(true);
                }
              }}
            >
              {editing ? (
                <Check className="size-4" />
              ) : (
                <Edit3 className="size-4" />
              )}
            </Button>
          </div>
          <SheetDescription className="sr-only">
            View and edit task details
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-1 flex-col gap-5 px-1 py-4">
          {/* Title & Priority */}
          <div className="flex items-start justify-between gap-3">
            {editing ? (
              <Input
                aria-label="Task title"
                value={formData.title ?? task.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
            ) : (
              <h2 className="text-lg font-semibold">{task.title}</h2>
            )}
            <PriorityBadge priority={formData.priority ?? task.priority} />
          </div>

          {/* Description */}
          {editing ? (
            <Textarea
              aria-label="Task description"
              value={formData.description ?? task.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            />
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {task.description}
            </p>
          )}

          {/* Status & Priority Selectors */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Status
              </label>
              <Select
                value={formData.status ?? task.status}
                onValueChange={(value) => updateStatus(value as Status)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">To do</SelectItem>
                  <SelectItem value="in_progress">In progress</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Priority
              </label>
              <Select
                value={formData.priority ?? task.priority}
                onValueChange={(value) => {
                  const priority = value as Priority;
                  setFormData((prev) => ({ ...prev, priority }));
                  onUpdate(task.id, { priority });
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{percent}%</span>
            </div>
            <Progress value={percent} />
          </div>

          {/* Subtasks Section */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">
                Subtasks{" "}
                <span className="text-muted-foreground">
                  {task.subtasks.length}
                </span>
              </h3>
              <span className="text-xs text-muted-foreground">
                {completed} of {task.subtasks.length} done
              </span>
            </div>
            <div className="overflow-hidden rounded-lg border">
              {task.subtasks.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleSubtask(item.id)}
                  className="flex w-full items-center gap-2 border-b px-3 py-2.5 text-left text-sm last:border-0 hover:bg-muted/50"
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded border ${
                      item.completed
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-input"
                    }`}
                  >
                    {item.completed ? <Check className="size-3" /> : null}
                  </span>
                  <span
                    className={
                      item.completed ? "text-muted-foreground line-through" : ""
                    }
                  >
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                aria-label="New subtask"
                placeholder="Add a subtask..."
                value={subtask}
                onChange={(e) => setSubtask(e.target.value)}
                onKeyDown={(e) => {
                  if (
                    e.key === "Enter" &&
                    !e.nativeEvent.isComposing &&
                    e.keyCode !== 229
                  ) {
                    addSubtask();
                  }
                }}
              />
              <Button
                variant="outline"
                size="icon"
                aria-label="Add subtask"
                onClick={addSubtask}
              >
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Footer Action Section */}
        {editing && (
          <SheetFooter className="border-t pt-4">
            <div className="flex w-full items-center gap-2">
              <Button
                variant="outline"
                className="w-1/2"
                onClick={() => setEditing(false)}
              >
                Cancel
              </Button>
              <Button className="w-1/2 gap-1.5" onClick={handleSave}>
                <Save className="size-4" />
                Update Task
              </Button>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default DetailTask;
