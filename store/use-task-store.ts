"use client";

import { initialTasks } from "@/lib/data/tasks";
import { Status, Task } from "@/types/task";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type TaskStore = {
  tasks: Task[];
  searchQuery: string;
  isAddSheetOpen: boolean;
  isDetailSheetOpen: boolean;
  selectedTask: Task | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setAddSheetOpen: (open: boolean) => void;
  openTaskDetail: (task: Task) => void;
  closeDetailSheet: () => void;
  moveTask: (id: string, status: Status) => void;
  addTask: (
    task: Omit<
      Task,
      "id" | "subtasks" | "comments" | "attachments" | "progress"
    >,
  ) => void;
  updateTask: (id: string, patch: Partial<Task>) => void;
  toggleSubtask: (taskId: string, subtaskId: string) => void;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      searchQuery: "",
      isAddSheetOpen: false,
      isDetailSheetOpen: false,
      selectedTask: null,

      setSearchQuery: (query) => set({ searchQuery: query }),
      setAddSheetOpen: (open) => set({ isAddSheetOpen: open }),

      openTaskDetail: (task) =>
        set({ selectedTask: task, isDetailSheetOpen: true }),
      closeDetailSheet: () =>
        set({ selectedTask: null, isDetailSheetOpen: false }),
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
        set((state) => {
          const updatedTasks = state.tasks.map((task) =>
            task.id === id ? { ...task, ...patch } : task,
          );

          return {
            tasks: updatedTasks,

            selectedTask:
              state.selectedTask?.id === id
                ? { ...state.selectedTask, ...patch }
                : state.selectedTask,
          };
        }),

      toggleSubtask: (taskId, subtaskId) =>
        set((state) => {
          const updatedTasks = state.tasks.map((task) => {
            if (task.id !== taskId) return task;
            const updatedSubtasks = task.subtasks.map((st) =>
              st.id === subtaskId ? { ...st, completed: !st.completed } : st,
            );
            return { ...task, subtasks: updatedSubtasks };
          });

          return {
            tasks: updatedTasks,
            selectedTask:
              state.selectedTask?.id === taskId
                ? {
                    ...state.selectedTask,
                    subtasks: state.selectedTask.subtasks.map((st) =>
                      st.id === subtaskId
                        ? { ...st, completed: !st.completed }
                        : st,
                    ),
                  }
                : state.selectedTask,
          };
        }),
    }),

    { name: "taskflow-board" },
  ),
);
