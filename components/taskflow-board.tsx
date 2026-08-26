"use client";

import { useMemo } from "react";
import {
  DndContext,
  DragEndEvent,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskStore, type Status } from "@/lib/task-store";
import { Plus, Search } from "lucide-react";

import DetailTask from "./detailTask";
import DroppableColumn from "./board/droppableColumn";
import AddTaskSheet from "./board/addTaskSheet";

const COLUMNS: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const TaskflowBoard = () => {
  const {
    tasks,
    searchQuery,
    setSearchQuery,
    setAddSheetOpen,
    moveTask,
    closeDetailSheet,
    updateTask,
    selectedTask: task,
  } = useTaskStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  );

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [tasks, searchQuery]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    moveTask(taskId, newStatus);
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Kanban Board</h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update status.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          <Button onClick={() => setAddSheetOpen(true)} className="gap-1">
            <Plus className="h-4 w-4" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {/* Kanban Board Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((column) => (
            <DroppableColumn
              key={column.id}
              id={column.id}
              title={column.title}
              tasks={filteredTasks.filter((t) => t.status === column.id)}
            />
          ))}
        </div>
      </DndContext>

      {/* Modals / Sheets */}
      <AddTaskSheet />
      {/* <DetailTask /> */}
      <DetailTask
        task={task}
        onClose={closeDetailSheet}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default TaskflowBoard;
