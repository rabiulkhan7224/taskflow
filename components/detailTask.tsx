import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Priority, Status, Task } from "@/lib/task-store";
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Edit3, Paperclip, Plus } from "lucide-react";
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
import { Badge } from "./ui/badge";
import { PriorityBadge } from "./PriorityBadge";

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

  if (!task) return null;
  const completed = task.subtasks.filter((item) => item.completed).length;
  const percent = task.subtasks.length
    ? Math.round((completed / task.subtasks.length) * 100)
    : task.progress;
  //   const addSubtask = () => {
  //     const title = subtask.trim();
  //     if (!title) return;

  //     onUpdate(task.id, {
  //       subtasks: [
  //         ...task.subtasks,
  //         { id: `s${Date.now()}`, title, completed: false },
  //       ],
  //       progress: percent,
  //     });
  //     setSubtask("");
  //   };

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

  //   const toggle = (id: string) => {
  //     const subtasks = task.subtasks.map((item) =>
  //       item.id === id ? { ...item, completed: !item.completed } : item,
  //     );
  //     const done = subtasks.filter((item) => item.completed).length;
  //     onUpdate(task.id, {
  //       subtasks,
  //       progress: subtasks.length
  //         ? Math.round((done / subtasks.length) * 100)
  //         : task.progress,
  //     });
  //   };

  const toggle = (id: string) => {
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
  const updateStatus = (status: Status) =>
    onUpdate(task.id, { status, progress: status === "done" ? 100 : percent });
  return (
    <Sheet open={Boolean(task)} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center justify-between pr-8">
            <SheetTitle>Task Detail</SheetTitle>
            <Button
              variant={editing ? "default" : "outline"}
              size="icon-sm"
              aria-label={editing ? "Save task" : "Edit task"}
              onClick={() => setEditing(!editing)}
            >
              {editing ? <Check /> : <Edit3 />}
            </Button>
          </div>
          <SheetDescription className="sr-only">
            View and edit task details
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-5 px-4 pb-6">
          <div className="flex items-start justify-between gap-3">
            {editing ? (
              <Input
                aria-label="Task title"
                value={task.title}
                onChange={(e) => onUpdate(task.id, { title: e.target.value })}
              />
            ) : (
              <h2 className="text-lg font-semibold">{task.title}</h2>
            )}
            <PriorityBadge priority={task.priority} />
          </div>
          {editing ? (
            <Textarea
              aria-label="Task description"
              value={task.description}
              onChange={(e) =>
                onUpdate(task.id, { description: e.target.value })
              }
            />
          ) : (
            <p className="text-sm leading-6 text-muted-foreground">
              {task.description}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-muted-foreground">
                Status
              </label>
              <Select
                value={task.status}
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
                value={task.priority}
                onValueChange={(value) =>
                  onUpdate(task.id, { priority: value as Priority })
                }
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
          <div className="flex flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Progress</span>
              <span className="text-muted-foreground">{percent}%</span>
            </div>
            <Progress value={percent} />
          </div>
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
                  onClick={() => toggle(item.id)}
                  className="flex w-full items-center gap-2 border-b px-3 py-2.5 text-left text-sm last:border-0 hover:bg-muted/50"
                >
                  <span
                    className={`flex size-4 shrink-0 items-center justify-center rounded border ${item.completed ? "border-primary bg-primary text-primary-foreground" : "border-input"}`}
                  >
                    {item.completed ? <Check /> : null}
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
                  )
                    addSubtask();
                }}
              />
              <Button
                variant="outline"
                size="icon"
                aria-label="Add subtask"
                onClick={addSubtask}
              >
                <Plus />
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 font-medium">
                <Paperclip />
                Attachments{" "}
                <Badge variant="secondary">{task.attachments}</Badge>
              </h3>
              <Button variant="outline" size="sm">
                <Plus data-icon="inline-start" />
                Add file
              </Button>
            </div>
            <div className="rounded-lg border bg-muted/20 p-3 text-sm text-muted-foreground">
              Attachments are ready for your project files.
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DetailTask;
