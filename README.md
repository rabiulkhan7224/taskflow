# TaskFlow - Lightweight Project Management App

TaskFlow is a clean, responsive, and intuitive project management tool built for small teams, agency leads, and freelancers to track work and stay organized without the bloated complexity of tools like Jira.

---

## 💡 Step 01: Thinking & Product Design Logic

### 1. User & Top 3 Goals

- **Target Users:** Small team leads, agency project managers, and freelancers managing client work (mixed technical & non-technical users).
- **Top 3 Goals:**
  1. **At-a-Glance Progress Tracking:** Quickly view active project statuses and task distributions.
  2. **Fast Task Creation & Assignment:** Instantly create tasks, set deadlines, and assign them to team members without navigating deep menus.
  3. **Overdue & Priority Awareness:** Immediately identify critical, overdue tasks that need urgent attention.

### 2. First Screen Priority (After Login)

- **Priority Feature:** A high-level **Summary Dashboard** displaying core metrics (`Total Tasks`, `Overdue Count`, `Active Projects`) and an **Urgent / Due Soon** task list.
- **Reasoning:** Users log in primarily to figure out _what needs immediate action today_. Placing top-level stats and impending deadlines front and center saves cognitive load and eliminates unnecessary navigation.

### 3. Key User Flow: Task Creation

1. **Entry:** User enters the application and clicks the global **"+ Add Task"** button (accessible via top bar or board header).
2. **Modal / Sheet trigger:** A streamlined Slide-over Sheet (or Modal) appears containing essential input fields.
3. **Data Input:** User enters Task Title, Description, selects Project, Assignee, Priority, Status, and Due Date.
4. **Submission:** Clicking **"Add Task"** validates inputs via Zod, updates the Zustand global state, closes the sheet, and instantly renders the newly created task card on the **Kanban Task Board**.

### 4. Key Assumptions

- **Single-Team Environment:** Designed for a single-team structure with support for multiple projects and assignees.
- **Client-Side Persistence:** Operating without a live backend; state management is handled using Zustand with local storage persistence to preserve state across page reloads.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS + shadcn/ui
- **State Management:** Zustand (with LocalStorage persistence)
- **Forms & Validation:** React Hook Form + Zod
- **Drag & Drop:** `@dnd-kit/core` & `@dnd-kit/sortable`
- **Icons:** Lucide React

---

## 🚀 How to Run Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/rabiulkhan7224/taskflow.git
   ```
