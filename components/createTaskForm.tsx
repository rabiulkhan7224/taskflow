

'use client';

import { useForm } from 'react-hook-form';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTaskStore } from '@/lib/task-store';

export function AddTaskSheet(
    open: boolean,
    onOpenChange: (open: boolean) => void
) {
  const {  addTask } = useTaskStore();
  const { register, handleSubmit, setValue } = useForm(
    defaultValues: {
  );

  const onSubmit = (data: any) => {
    addTask({
      title: data.title,
      description: data.description,
      status: data.status || 'backlog',
      priority: data.priority || 'Medium',
      dueDate: data.dueDate || 'Sep 25',
      progress: 0,
      assignees: [{ name: 'Emma Johnson', avatar: '' }]
    });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Add Task</SheetTitle>
          <SheetDescription>Create a new task</SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium">Status</label>
            <Select onValueChange={(val) => setValue('status', val)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="backlog">Backlog</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Title</label>
            <Input {...register('title', { required: true })} placeholder="What needs to be done?" />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <Textarea {...register('description')} placeholder="Add more details..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Priority</label>
              <Select onValueChange={(val) => setValue('priority', val)} defaultValue="Medium">
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="High">🔴 High</SelectItem>
                  <SelectItem value="Medium font-medium">🟡 Medium</SelectItem>
                  <SelectItem value="Low">🟢 Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium">Due date</label>
              <Input type="date" {...register('dueDate')} />
            </div>
          </div>

          <SheetFooter className="mt-6 flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => setAddSheetOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Task</Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}