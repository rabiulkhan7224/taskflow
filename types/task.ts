import { Assignee } from "./user";

export type Status = "todo" | "in_progress" | "done";
export type Priority = "high" | "medium" | "low";

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
};
export type Task = {
  id: string;
  title: string;
  description: string;
  project: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  progress: number;
  assignees: Assignee[];
  comments: number;
  attachments: number;
  subtasks: Subtask[];
};
