import { AlertTriangle, LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DemoBanner() {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20">
      <div className="container px-4 py-2 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 text-sm">
          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
          <span className="text-center sm:text-left">
            You are in Demo Mode — data is read-only.
          </span>
        </div>
        <Button variant="outline" size="sm" asChild className="text-xs">
          <Link to="/register">
            <LogIn className="h-3 w-3 mr-1" />
            Sign Up for Full Access
          </Link>
        </Button>
      </div>
    </div>
  );
}
