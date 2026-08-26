import { create } from "zustand";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  priority: "High" | "Medium" | "Low";
  dueDate: string;
  progress: number;
  assignees: { name: string; avatar: string }[];
  subtasks?: { id: string; title: string; completed: boolean }[];
}

interface TaskStore {
  tasks: Task[];
  isAddSheetOpen: boolean;
  isDetailSheetOpen: boolean;
  selectedTask: Task | null;

  // Actions
  setAddSheetOpen: (open: boolean) => void;
  openTaskDetail: (task: Task) => void;
  closeDetailSheet: () => void;
  addTask: (task: Omit<Task, "id">) => void;
  updateTaskStatus: (taskId: string, status: Task["status"]) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [
    {
      id: "task-1",
      title: "Integrate Stripe payment gateway",
      description:
        "Set up and configure Stripe API for handling credit card transactions.",
      status: "todo",
      priority: "High",
      dueDate: "Sep 20",
      progress: 33,
      assignees: [{ name: "User 1", avatar: "/avatar1.png" }],
    },
    {
      id: "task-2",
      title: "Dark mode toggle implementation",
      description:
        "Allow users to switch between light and dark themes in settings.",
      status: "in_progress",
      priority: "High",
      dueDate: "Sep 18",
      progress: 33,
      assignees: [{ name: "Charlie Wilson", avatar: "/avatar2.png" }],
      subtasks: [
        {
          id: "sub-1",
          title: "Add theme context and provider",
          completed: true,
        },
        {
          id: "sub-2",
          title: "Persist preference to local storage",
          completed: false,
        },
      ],
    },
  ],
  isAddSheetOpen: false,
  isDetailSheetOpen: false,
  selectedTask: null,

  setAddSheetOpen: (open) => set({ isAddSheetOpen: open }),
  openTaskDetail: (task) =>
    set({ selectedTask: task, isDetailSheetOpen: true }),
  closeDetailSheet: () => set({ selectedTask: null, isDetailSheetOpen: false }),

  addTask: (newTask) =>
    set((state) => ({
      tasks: [...state.tasks, { ...newTask, id: `task-${Date.now()}` }],
      isAddSheetOpen: false,
    })),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, status } : t)),
    })),
}));
