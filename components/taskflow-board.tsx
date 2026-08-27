"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTaskStore } from "@/store/use-task-store";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Filter, Plus, RotateCcw, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { AddTaskSheet } from "@/components/createTaskForm";
import { Status } from "@/types/task";
import DroppableColumn from "./board/droppableColumn";
import DetailTask from "./detailTask";

const COLUMNS: { id: Status; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
];

const TaskflowBoard = () => {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const {
    tasks,
    searchQuery,
    setSearchQuery,
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

  // Advanced task filtering based on search query, priority, and status
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesSearch = task.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter;
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter;

      return matchesSearch && matchesPriority && matchesStatus;
    });
  }, [tasks, searchQuery, priorityFilter, statusFilter]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Status;

    moveTask(taskId, newStatus);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setPriorityFilter("all");
    setStatusFilter("all");
  };

  const hasActiveFilters =
    searchQuery !== "" || priorityFilter !== "all" || statusFilter !== "all";

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">TaskFlow Board</h1>
          <p className="text-sm text-muted-foreground">
            Drag tasks between columns to update status.
          </p>
        </div>

        <Button onClick={() => setIsAddTaskOpen(true)} className="gap-1.5">
          <Plus className="size-4" />
          <span>Add Task</span>
        </Button>
      </div>

      {/* Filter Toolbar (Added under Header) */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border bg-card p-3 shadow-sm">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>

          {/* Priority Filter */}
          <div className="w-[140px]">
            <Select
              value={priorityFilter}
              onValueChange={(value) => setPriorityFilter(value ?? "all")}
            >
              <SelectTrigger className="w-full">
                <div className="flex items-center gap-2 truncate">
                  <Filter className="size-3.5 text-muted-foreground" />
                  <SelectValue placeholder="Priority" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Status Filter */}
          <div className="w-[140px]">
            <Select
              value={statusFilter}
              onValueChange={(value) => setStatusFilter(value ?? "all")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reset Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="gap-1.5 bg-blue-500  hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              <span>Reset</span>
            </Button>
          )}
        </div>

        {/* Filter Summary Count */}
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredTasks.length}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-foreground">{tasks.length}</span>{" "}
          tasks
        </div>
      </div>

      {/* Kanban Board Context */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
        id="taskflow-dnd-context"
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

      {/* Sheets */}
      <AddTaskSheet open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />
      <DetailTask
        task={task}
        onClose={closeDetailSheet}
        onUpdate={updateTask}
      />
    </div>
  );
};

export default TaskflowBoard;
