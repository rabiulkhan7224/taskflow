"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Status = "todo" | "in_progress" | "done";
export type Priority = "high" | "medium" | "low";
export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  progress: number;
  assignees: string[];
  comments: number;
  attachments: number;
  subtasks: { id: string; title: string; completed: boolean }[];
};

const initialTasks: Task[] = [
  {
    id: "t1",
    title: "Finalize homepage copy",
    description: "Polish the final messaging and prepare it for review.",
    project: "Website Redesign",
    status: "todo",
    priority: "high",
    dueDate: "Sep 18",
    progress: 33,
    assignees: ["AR", "JM"],
    comments: 4,
    attachments: 2,
    subtasks: [
      { id: "s1", title: "Review headline options", completed: true },
      { id: "s2", title: "Add social proof section", completed: false },
    ],
  },
  {
    id: "t2",
    title: "Prepare client presentation",
    description: "Turn the latest project notes into a concise client deck.",
    project: "Q4 Campaign",
    status: "todo",
    priority: "medium",
    dueDate: "Sep 20",
    progress: 15,
    assignees: ["SK"],
    comments: 2,
    attachments: 1,
    subtasks: [],
  },
  {
    id: "t3",
    title: "Review analytics dashboard",
    description:
      "Validate KPI definitions and resolve the open tracking questions.",
    project: "Internal Ops",
    status: "in_progress",
    priority: "high",
    dueDate: "Sep 16",
    progress: 66,
    assignees: ["AR", "SK"],
    comments: 7,
    attachments: 3,
    subtasks: [
      { id: "s3", title: "Check event naming", completed: true },
      { id: "s4", title: "Document conversion funnel", completed: false },
    ],
  },
  {
    id: "t4",
    title: "Update brand guidelines",
    description: "Document the new visual system for the wider team.",
    project: "Brand Refresh",
    status: "in_progress",
    priority: "low",
    dueDate: "Sep 22",
    progress: 48,
    assignees: ["JM"],
    comments: 3,
    attachments: 4,
    subtasks: [],
  },
  {
    id: "t5",
    title: "Set up project workspace",
    description: "Create the shared workspace structure and permissions.",
    project: "Internal Ops",
    status: "done",
    priority: "medium",
    dueDate: "Sep 12",
    progress: 100,
    assignees: ["AR"],
    comments: 5,
    attachments: 2,
    subtasks: [{ id: "s5", title: "Invite project team", completed: true }],
  },
  {
    id: "t6",
    title: "Approve campaign direction",
    description: "Lock the concept and share next steps with the team.",
    project: "Q4 Campaign",
    status: "done",
    priority: "high",
    dueDate: "Sep 14",
    progress: 100,
    assignees: ["SK", "JM"],
    comments: 8,
    attachments: 5,
    subtasks: [],
  },
];

type TaskStore = {
  tasks: Task[];
  moveTask: (id: string, status: Status) => void;
  addTask: (
    task: Omit<
      Task,
      "id" | "subtasks" | "comments" | "attachments" | "progress"
    >,
  ) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      moveTask: (id, status) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status,
                  progress: status === "done" ? 100 : task.progress,
                }
              : task,
          ),
        })),
      addTask: (task) =>
        set((state) => ({
          tasks: [
            ...state.tasks,
            {
              ...task,
              id: `t${Date.now()}`,
              progress: 0,
              comments: 0,
              attachments: 0,
              subtasks: [],
            },
          ],
        })),
      updateTask: (id, patch) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...patch } : task,
          ),
        })),
    }),
    { name: "taskflow-board" },
  ),
);
