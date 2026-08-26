"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FolderKanban,
  LayoutDashboard,
  MoreHorizontal,
  Plus,
  Search,
  Settings2,
  Sparkles,
  TrendingUp,
  Users,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const user = {
  name: "Alex Rivera",
  email: "alex@agency.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
  role: "Project Lead",
};

const tasks = [
  {
    title: "Finalize homepage copy",
    project: "Website Redesign",
    assignee: "MR",
    due: "Today",
    priority: "High",
    tone: "bg-rose-100 text-rose-700",
  },
  {
    title: "Review analytics dashboard",
    project: "Product Launch",
    assignee: "JK",
    due: "Tomorrow",
    priority: "Medium",
    tone: "bg-amber-100 text-amber-700",
  },
  {
    title: "Prepare client presentation",
    project: "Q3 Campaign",
    assignee: "SL",
    due: "Aug 28",
    priority: "High",
    tone: "bg-rose-100 text-rose-700",
  },
  {
    title: "Update brand guidelines",
    project: "Brand Refresh",
    assignee: "AD",
    due: "Aug 29",
    priority: "Low",
    tone: "bg-emerald-100 text-emerald-700",
  },
];

const stats = [
  {
    label: "Total Tasks",
    value: "24",
    change: "+8.2%",
    icon: CircleDashed,
    note: "from last week",
  },
  {
    label: "Active Projects",
    value: "4",
    change: "+1",
    icon: FolderKanban,
    note: "this month",
  },
  {
    label: "Overdue Tasks",
    value: "3",
    change: "Needs attention",
    icon: CalendarDays,
    note: "across 2 projects",
    alert: true,
  },
  {
    label: "Completed This Week",
    value: "12",
    change: "+14.3%",
    icon: CheckCircle2,
    note: "from last week",
  },
];

function PriorityBadge({ priority, tone }: { priority: string; tone: string }) {
  return (
    <Badge variant="secondary" className={`border-0 ${tone}`}>
      {priority}
    </Badge>
  );
}

export function TaskFlowDashboard() {
  return (
    <div className="min-h-screen bg-muted/40 text-foreground">
      <header className="border-b bg-background/95">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 lg:px-10">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="flex items-center gap-2.5"
              aria-label="TaskFlow home"
            >
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Sparkles className="size-4" />
              </span>
              <span className="text-lg font-semibold tracking-tight">
                TaskFlow
              </span>
            </Link>
            <nav
              className="hidden items-center gap-1 md:flex"
              aria-label="Primary navigation"
            >
              <Button variant="secondary" size="sm" className="gap-2">
                <LayoutDashboard data-icon="inline-start" /> Overview
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Link href="/board">
                  <FolderKanban data-icon="inline-start" /> Board
                </Link>
              </Button>
              <Button variant="ghost" size="sm" className="gap-2">
                <Users data-icon="inline-start" /> Team
              </Button>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              aria-label="Notifications"
            >
              <Bell />
              <span className="absolute right-2 top-2 size-1.5 rounded-full bg-rose-500" />
            </Button>
            <div className="hidden h-7 w-px bg-border sm:block" />
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={user.avatar} alt={`${user.name} profile`} />
                <AvatarFallback>AR</AvatarFallback>
              </Avatar>
              <div className="hidden leading-tight sm:block">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-muted-foreground">{user.role}</p>
              </div>
              <ChevronRight className="hidden size-4 rotate-90 text-muted-foreground sm:block" />
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1440px] px-5 py-8 lg:px-10 lg:py-10">
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Tuesday, August 26, 2026
            </p>
            <h1 className="text-balance text-3xl font-semibold tracking-tight lg:text-4xl">
              Good morning, Alex
            </h1>
            <p className="mt-2 text-pretty text-muted-foreground">
              Here&apos;s what&apos;s happening across your projects today.
            </p>
          </div>
          <Button className="w-fit gap-2">
            <Plus data-icon="inline-start" /> New task
          </Button>
        </div>

        <section aria-labelledby="overview-heading">
          <h2 id="overview-heading" className="sr-only">
            Workspace overview
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className={stat.alert ? "border-rose-200" : ""}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {stat.label}
                        </p>
                        <p
                          className={`mt-3 text-3xl font-semibold tracking-tight ${stat.alert ? "text-rose-600" : ""}`}
                        >
                          {stat.value}
                        </p>
                      </div>
                      <span
                        className={`flex size-9 items-center justify-center rounded-lg ${stat.alert ? "bg-rose-50 text-rose-600" : "bg-muted text-muted-foreground"}`}
                      >
                        <Icon className="size-4" />
                      </span>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs">
                      <span
                        className={`font-medium ${stat.alert ? "text-rose-600" : "text-emerald-600"}`}
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
          <Card>
            <CardHeader className="flex flex-row items-start justify-between gap-4">
              <div>
                <CardTitle className="text-lg">Urgent &amp; due soon</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tasks that need your attention in the next 3 days.
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Link href="/board">
                  View on Board <ArrowUpRight data-icon="inline-end" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {tasks.map((task) => (
                  <div
                    key={task.title}
                    className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <Avatar className="size-9 shrink-0">
                        <AvatarFallback className="bg-muted text-xs font-medium">
                          {task.assignee}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {task.title}
                        </p>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          <span>{task.project}</span>
                          <span aria-hidden="true">·</span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="size-3" /> {task.due}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 pl-12 sm:pl-0">
                      <PriorityBadge
                        priority={task.priority}
                        tone={task.tone}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`More options for ${task.title}`}
                      >
                        <MoreHorizontal />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
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
                  <Settings2 />
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
                  <span className="font-medium">Product Launch</span>
                  <span className="text-muted-foreground">54%</span>
                </div>
                <Progress value={54} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium">Q3 Campaign</span>
                  <span className="text-muted-foreground">32%</span>
                </div>
                <Progress value={32} />
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
      </main>
    </div>
  );
}

export default TaskFlowDashboard;
