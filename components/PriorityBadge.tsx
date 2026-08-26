import { Priority } from "@/lib/task-store";
import { Badge } from "./ui/badge";

const PriorityBadge = ({ priority }: { priority: Priority }) => {
  return (
    <Badge variant="outline" className="gap-1.5 capitalize">
      <span
        className={`size-1.5 rounded-full bg-current ${priority === "high" ? "text-destructive" : priority === "medium" ? "text-amber-600" : "text-muted-foreground"}`}
      />
      {priority}
    </Badge>
  );
};
export { PriorityBadge };
