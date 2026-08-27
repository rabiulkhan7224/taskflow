# TaskFlow - Lightweight Project Management App

TaskFlow is a clean, responsive, and intuitive project management tool built for small teams, agency leads, and freelancers to track work and stay organized without the bloated complexity of traditional enterprise software.

🔗 **Live Demo:** [https://taskflow-beryl-three.vercel.app](https://taskflow-beryl-three.vercel.app)

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
- ☑️ **Subtask Management & Checklist:** Create, toggle, individual subtasks within any task view.
- 📊 **Dynamic Task Progress:** Real-time percentage indicator and progress bar displaying completed subtasks (`X / Y` finished).
- 📊 **Metrics Dashboard:** Real-time key performance indicators tracking progress, priority distributions, and overdue status.
- ⚡ **Streamlined Task Creation:** Slide-over sheet form built with `react-hook-form` and `zod` validation, handling assignees, due dates, and project tags.
- 🔍 **Filtering & Search:** Real-time search by task title along with select-based filter controls for priority and project tags.
- 🔔 **Toast Notifications:** Built-in feedback via `sonner` / shadcn toast upon task creation, update, and movement.
- 💾 **State Persistence:** LocalStorage-backed Zustand store ensuring all custom tasks, movements, and state changes persist across browser reloads.

---

Here is the complete **User Flow section** formatted in clean Markdown, ready to add to your `README.md` file right below your Product Design or Features section.

## 🔄 User Flow Architecture

```

[ Dashboard / Landing Screen ]
│
├──► 1. View Overview Metrics (Total Tasks, Overdue Count, Progress)
│
├──► 2. Filter & Search Tasks
│       ├── Search by Title / Keyword
│       └── Filter by Priority, Status, or Project
│
├──► 3. Create New Task
│       ├── Click "+ Add Task" Button
│       ├── Fill Slide-over Sheet (Title, Project, Assignee, Priority, Status, Due Date)
│       └── Submit ──► Validation Pass ──► Task Card Rendered on Kanban Board
│
├──► 4. Interactive Kanban Management
│       └── Drag & Drop Task Cards between columns (To Do ──► In Progress ──► Done)
│
└──► 5. Manage Task Details & Subtasks
├── Click on any Task Card to open "View Task Sheet"
├── Add new Subtasks
├── Toggle Subtask Checkboxes ──► Real-time Progress % Updates
└── Delete Completed / Obsolete Subtasks

```

### Detailed Flow Breakdown

1. **Dashboard & Metric Overview:** Upon login or entry, the user lands on the primary dashboard containing real-time metrics (`Total Tasks`, `Overdue Count`, `Completed Tasks`) and active project cards.
2. **Task Search & Filtering:** Users can filter task boards dynamically using keywords or dropdown selectors for project tag, priority, and column status.
3. **Task Creation:** Clicking the global **"+ Add Task"** button opens a slide-over sheet. The user inputs task details, assigns team members, sets deadlines, and submits. The form validates inputs with Zod and dispatches the action to Zustand.
4. **Kanban Board Drag & Drop:** Dragging task cards across column boundaries (`To Do`, `In Progress`, `Done`) instantly updates task status in global state and triggers a confirmation toast.
5. **Detailed View & Subtask Management:** Clicking a task card opens the detailed view sheet where users can add subtasks, check off completed items, observe the dynamic progress bar (% completed), or delete subtasks.

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
   git clone https://github.com/rabiulkhan7224/taskflow.git
   cd taskflow
   ```

2. **install and run:**

```bash
npm install
 npm run dev



```
