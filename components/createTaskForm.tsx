"use client";

import { useForm, Controller } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTaskStore } from "@/store/use-task-store";
import { Priority, Status } from "@/types/task";
import { usersData } from "@/lib/data/users";
import { Label } from "./ui/label";

interface AddTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormInputs {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  assigneeId: string;
  project: string;
}

export function AddTaskSheet({ open, onOpenChange }: AddTaskSheetProps) {
  const { addTask } = useTaskStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      description: "",
      status: "todo",
      priority: "medium",
      dueDate: "",
      project: "Website Redesign",
      assigneeId: String(usersData[0].id),
    },
  });

  const onSubmit = (data: FormInputs) => {
    const selectedUser =
      usersData.find((u) => u.id === Number(data.assigneeId)) || usersData[0];

    let formattedDate = "Sep 25";
    if (data.dueDate) {
      const dateObj = new Date(data.dueDate);
      formattedDate = dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }

    addTask({
      title: data.title,
      description: data.description || "",
      project: data.project, // FIXED: Now uses user input instead of "General"
      status: data.status,
      priority: data.priority,
      dueDate: formattedDate,
      assignees: [selectedUser],
    });

    reset();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-135 sm:w-135">
        <SheetHeader>
          <SheetTitle>Add New Task</SheetTitle>
          <SheetDescription>
            Fill out the details below to create a new task.
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-4">
          {/* Title */}
          <div>
            <label className="text-sm font-medium">Title *</label>
            <Input
              {...register("title", { required: "Title is required" })}
              placeholder="What needs to be done?"
              className="mt-1"
            />
            {errors.title && (
              <span className="text-xs text-red-500">
                {errors.title.message}
              </span>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea
              {...register("description")}
              placeholder="Add more details..."
              className="mt-1"
            />
          </div>

          {/* Project Name */}
          <div>
            <Label>Project name *</Label>
            <Input
              {...register("project", { required: "Project name is required" })} // FIXED: Changed "title" to "project"
              placeholder="Write your project name"
              className="mt-1"
            />
            {errors.project && (
              <span className="text-xs text-red-500">
                {errors.project.message}
              </span>
            )}
          </div>

          {/* Status & Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Status</label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Priority</label>
              <Controller
                name="priority"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""} // FIXED: Controlled value
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">🔴 High</SelectItem>
                      <SelectItem value="medium">🟡 Medium</SelectItem>
                      <SelectItem value="low">🟢 Low</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* Assignee & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Assignee</label>
              <Controller
                name="assigneeId"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    value={field.value ?? ""} // FIXED: Controlled value
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select assignee" />
                    </SelectTrigger>
                    <SelectContent>
                      {usersData.map((user) => (
                        <SelectItem key={user.id} value={String(user.id)}>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5">
                              <AvatarImage src={user.avatar} />
                              <AvatarFallback className="text-[9px]">
                                {user.name.slice(0, 2)}
                              </AvatarFallback>
                            </Avatar>
                            <span>{user.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Due Date</label>
              <Input type="date" {...register("dueDate")} className="mt-1" />
            </div>
          </div>

          <SheetFooter className="mt-6 flex justify-end gap-2 pt-4 border-t">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}
