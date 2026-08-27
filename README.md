# TaskFlow - Lightweight Project Management App

TaskFlow is a clean, responsive, and intuitive project management tool built for small teams, agency leads, and freelancers to track work and stay organized without the bloated complexity of traditional enterprise software.

---

## 💡 Product Design & Architecture Logic

### 1. Target User & Core Objectives

- **Target Users:** Small team leads, agency project managers, and freelancers managing client work.
- **Top 3 Goals:**
  1. **At-a-Glance Progress Tracking:** Instantly view active project status, column breakdowns, and task distributions.
  2. **Fast Task Creation & Assignment:** Streamlined sheet-based form for quickly adding tasks with assignees, project tags, status, and priorities.
  3. **Overdue & Priority Awareness:** Immediately identify critical or overdue tasks needing immediate action.

### 2. Core User Experience

- **Dashboard First:** Upon loading, users land on a **Summary Dashboard** displaying real-time metrics (`Total Tasks`, `Overdue Count`, `Completed Tasks`) paired with a dynamic task view.
- **Interactive Kanban & Search:** Full drag-and-drop column sorting paired with real-time text searching and multi-attribute filtering (Priority, Status, Project).
- **Instant Visual Feedback:** Integrated toast notifications inform users whenever tasks are created, updated, or moved across statuses.

---

## ✨ Implemented Features

- 📋 **Interactive Kanban Board:** Drag-and-drop tasks seamlessly between columns (`To Do`, `In Progress`, `Done`) powered by `@dnd-kit`.
- 📊 **Metrics Dashboard:** Real-time key performance indicators tracking progress, priority distributions, and overdue status.
- ⚡ **Streamlined Task Creation:** Slide-over sheet form built with `react-hook-form` and `zod` validation, handling assignees, due dates, and project tags.
- 🔍 **Filtering & Search:** Real-time search by task title along with select-based filter controls for priority and project tags.
- 🔔 **Toast Notifications:** Built-in feedback via `sonner` / shadcn toast upon task creation, update, and movement.
- 💾 **State Persistence:** LocalStorage-backed Zustand store ensuring all custom tasks, movements, and state changes persist across browser reloads.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 16 (App Router with Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + shadcn/ui + Radix UI / Base UI
- **State Management:** Zustand (with `persist` middleware)
- **Forms & Validation:** React Hook Form + Zod
- **Drag & Drop:** `@dnd-kit/core` & `@dnd-kit/sortable`
- **Feedback & Toasts:** Sonner / Shadcn Toast
- **Icons:** Lucide React

---

## 🚀 How to Run Locally

### Prerequisites

Ensure you have Node.js 18+ and `npm`, `pnpm`, or `yarn` installed.

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/rabiulkhan7224/taskflow.git](https://github.com/rabiulkhan7224/taskflow.git)
   cd taskflow
   ```
