"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useAuthStore } from "@/store/use-auth-store";
import { useTaskStore } from "@/store/use-task-store";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  CircleDashed,
  FolderKanban,
  MoreHorizontal,
  Plus,
  Settings2,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AddTaskSheet } from "./createTaskForm";
const currentUser = {
  name: "Alex Rivera",
  email: "alex@agency.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  role: "Project Lead",
};

function PriorityBadge({ priority }: { priority: string }) {
  let tone =
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400";

  if (priority.toLowerCase() === "high") {
    tone = "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400";
  } else if (priority.toLowerCase() === "medium") {
    tone = "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400";
  }

  return (
    <Badge variant="secondary" className={`border-0 capitalize ${tone}`}>
      {priority}
    </Badge>
  );
}

export function TaskFlowDashboard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const { tasks } = useTaskStore();
  const { user, logout } = useAuthStore();
  const totalTasksCount = tasks.length;
  const completedTasksCount = tasks.filter((t) => t.status === "done").length;
  const activeProjectsCount = new Set(tasks.map((t) => t.project)).size;
  const urgentTasks = tasks.filter((t) => t.status !== "done").slice(0, 5);

  const dynamicStats = [
    {
      label: "Total Tasks",
      value: String(totalTasksCount),
      change: "+8.2%",
      icon: CircleDashed,
      note: "from last week",
    },
    {
      label: "Active Projects",
      value: String(activeProjectsCount),
      change: "+1",
      icon: FolderKanban,
      note: "in workspace",
    },
    {
      label: "Overdue Tasks",
      value: "3",
      change: "Needs attention",
      icon: CalendarDays,
      note: "across active projects",
      alert: true,
    },
    {
      label: "Completed Tasks",
      value: String(completedTasksCount),
      change: "+14.3%",
      icon: CheckCircle2,
      note: "overall progress",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      {/* Add Task Sheet Component */}
      <AddTaskSheet open={isAddTaskOpen} onOpenChange={setIsAddTaskOpen} />

      <div className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
              Good morning, {currentUser.name.split(" ")[0]}
            </h1>
            <p className="mt-2 text-pretty text-muted-foreground">
              Here&apos;s what&apos;s happening across your projects today.
            </p>
          </div>
          <Button
            onClick={() => setIsAddTaskOpen(true)}
            className="w-fit gap-2"
          >
            <Plus className="size-4" /> New task
          </Button>
        </div>

        {/* Dynamic Stats Grid */}
        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">
            Workspace overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {dynamicStats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className={
                    stat.alert ? "border-rose-200 dark:border-rose-900" : ""
                  }
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p
                          className={`mt-3 text-3xl font-semibold tracking-tight ${
                            stat.alert ? "text-rose-600 dark:text-rose-400" : ""
                          }`}
                        >
                          {stat.value}
                        </p>
                      </div>
                      <span
                        className={`flex size-9 items-center justify-center rounded-lg ${
                          stat.alert
                            ? "bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span
                        className={`font-medium ${
                          stat.alert ? "text-rose-600" : "text-emerald-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-muted-foreground">{stat.note}</span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.45fr_1fr]">
          {/* Dynamic Tasks List */}
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Urgent &amp; due soon</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tasks that need your attention in the next few days.
                </p>
              </div>
              <Button
                variant="outline"
                className="bg-primary hover:bg-primary/50 text-primary-foreground "
              >
                <Link
                  href="/dashboard/board"
                  className="flex items-center gap-1"
                >
                  View on Board <ArrowUpRight className="ml-1 size-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {urgentTasks.length === 0 ? (
                  <div className="p-6 text-center text-sm text-muted-foreground">
                    No active tasks available.
                  </div>
                ) : (
                  urgentTasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        {/* Assignee Avatar Display */}
                        <div className="flex -space-x-2 overflow-hidden shrink-0">
                          {task.assignees?.map((assignee, i) => (
                            <Avatar
                              key={i}
                              className="size-8 border-2 border-background"
                            >
                              <AvatarImage
                                src={assignee.avatar}
                                alt={assignee.name}
                              />
                              <AvatarFallback className="bg-muted text-[10px] font-medium">
                                {assignee.name
                                  ? assignee.name.slice(0, 2).toUpperCase()
                                  : "U"}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">
                            {task.title}
                          </p>
                          <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                            <span>{task.project || "General"}</span>
                            <span aria-hidden="true">·</span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="size-3" /> {task.dueDate}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pl-10 sm:pl-0">
                        <PriorityBadge priority={task.priority} />
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`More options for ${task.title}`}
                        >
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Project Progress Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">Project pulse</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your team&apos;s progress this week.
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Project settings"
                >
                  <Settings2 className="size-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Website Redesign</span>
                  <span className="text-muted-foreground">78%</span>
                </div>
                <Progress value={78} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Q4 Campaign</span>
                  <span className="text-muted-foreground">54%</span>
                </div>
                <Progress value={54} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Internal Ops</span>
                  <span className="text-muted-foreground">83%</span>
                </div>
                <Progress value={83} />
              </div>

              <div className="rounded-xl bg-muted/70 p-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TrendingUp className="size-4 text-emerald-600" /> Team
                  velocity is up
                </div>
                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  You&apos;ve completed 14% more tasks than last week. Keep the
                  momentum going.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex items-center justify-center p-2">
          <Button
            variant="outline"
            className="bg-primary hover:bg-primary/50 text-primary-foreground "
          >
            <Link href="/dashboard/board" className="flex items-center gap-1">
              Go to Board <ArrowUpRight className=" size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TaskFlowDashboard;
