"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useTaskStore, type Status, type Task } from "@/lib/task-store";
import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
  type DragEndEvent,
} from "@dnd-kit/react";
import {
  CalendarDays,
  CircleCheck,
  Clock3,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useMemo, useState } from "react";

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

function TaskCard({
  task,
  onOpen,
}: {
  task: Task;
  onOpen: (task: Task) => void;
}) {
  const drag = useDraggable({ id: task.id });

  return (
    <Card
      ref={drag.ref}
      onClick={() => onOpen(task)}
      className={`cursor-grab transition-shadow hover:shadow-md active:cursor-grabbing ${drag.isDragging ? "opacity-40" : ""}`}
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
          <People ids={task.assignees} />
        </div>
      </CardContent>
    </Card>
  );
}
function Column({
  column,
  tasks,
  onOpen,
}: {
  column: (typeof columns)[number];
  tasks: Task[];
  onOpen: (task: Task) => void;
}) {
  const drop = useDroppable({ id: column.id });
  const Icon = column.icon;
  return (
    <section
      ref={drop.ref}
      className={`flex min-h-[520px] flex-col gap-3 rounded-xl border bg-muted/30 p-3 ${drop.isDropTarget ? "border-primary bg-muted/60" : ""}`}
    >
      <div className="flex items-center justify-between px-1 pb-2">
        <h2 className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="size-4 text-muted-foreground" />
          {column.label}
        </h2>
        <Badge variant="secondary">{tasks.length}</Badge>
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} onOpen={onOpen} />
      ))}
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed text-xs text-muted-foreground">
        Drop tasks here
      </div>
    </section>
  );
}

export function TaskflowBoard() {
  const { tasks, moveTask, updateTask } = useTaskStore();
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [detailId, setDetailId] = useState<string | null>(null);
  const filtered = useMemo(
    () =>
      tasks.filter((task) =>
        `${task.title} ${task.project}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [tasks, query],
  );
  const detail = tasks.find((task) => task.id === detailId) ?? null;
  function onDragEnd(event: DragEndEvent) {
    const target = event.operation.target?.id as Status | undefined;
    const source = event.operation.source?.id;
    if (target && source && columns.some((column) => column.id === target))
      moveTask(String(source), target);
    setActiveId(null);
  }
  return (
    <DragDropProvider
      onDragStart={(event) => setActiveId(String(event.operation.source.id))}
      onDragEnd={onDragEnd}
    >
      <main className="min-h-screen bg-muted/20 px-4 py-6 text-foreground sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1500px]">
          <header className="flex flex-col gap-5 border-b pb-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  Workspace / Projects
                </p>
                <h1 className="text-3xl font-semibold tracking-tight">
                  Kanban Board
                </h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  Plan, prioritize, and ship work with your team.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex rounded-lg border bg-background p-1">
                <Button variant="secondary" size="sm">
                  Board
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  List
                </Button>
                <Button variant="ghost" size="sm" disabled>
                  Table
                </Button>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-2.5 size-4 text-muted-foreground" />
                <Input
                  aria-label="Search tasks"
                  placeholder="Search tasks..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-9 sm:w-64"
                />
              </div>
            </div>
          </header>
          <div className="grid gap-5 pt-6 lg:grid-cols-3">
            {columns.map((column) => (
              <Column
                key={column.id}
                column={column}
                tasks={filtered.filter((task) => task.status === column.id)}
                onOpen={(task) => setDetailId(task.id)}
              />
            ))}
          </div>
        </div>
      </main>
      <DragOverlay>
        {tasks.find((task) => task.id === activeId) ? (
          <Card className="w-80">
            <CardContent className="p-4 font-medium">
              {tasks.find((task) => task.id === activeId)?.title}
            </CardContent>
          </Card>
        ) : null}
      </DragOverlay>
      <DetailTask
        task={detail}
        onClose={() => setDetailId(null)}
        onUpdate={updateTask}
      />
    </DragDropProvider>
  );
}
