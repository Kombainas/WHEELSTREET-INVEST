import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";
import { Inbox } from "lucide-react";

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  /** "light" for admin pages, "dark" for member/verification pages */
  variant?: "light" | "dark";
}

export function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  actionHref,
  variant = "light",
}: EmptyStateProps) {
  const isDark = variant === "dark";

  return (
    <div className={`text-center py-12 px-4 ${isDark ? "" : ""}`}>
      <Icon
        className={`w-10 h-10 mx-auto mb-3 ${
          isDark ? "text-gray-600" : "text-gray-300"
        }`}
      />
      <h3
        className={`text-lg font-semibold mb-1 ${
          isDark ? "text-gray-300" : "text-gray-900"
        }`}
      >
        {title}
      </h3>
      {description && (
        <p
          className={`text-sm max-w-xs mx-auto ${
            isDark ? "text-gray-500" : "text-gray-500"
          }`}
        >
          {description}
        </p>
      )}
      {actionLabel && actionHref && (
        <div className="mt-4">
          <Link href={actionHref}>
            <Button
              size="sm"
              variant={isDark ? "outline" : "default"}
              className={
                isDark
                  ? "border-white/10 bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white"
                  : ""
              }
            >
              {actionLabel}
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
