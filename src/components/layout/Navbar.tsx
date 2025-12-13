import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { GraduationCap, LogOut, User, BookOpen, Users, Menu } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
      });
      setOpen(false);
      navigate("/");
    }
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Button
        variant="ghost"
        size={mobile ? "lg" : "sm"}
        asChild
        className={mobile ? "w-full justify-start" : ""}
        onClick={() => mobile && setOpen(false)}
      >
        <Link to="/subjects" className="flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          <span>Subjects</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size={mobile ? "lg" : "sm"}
        asChild
        className={mobile ? "w-full justify-start" : ""}
        onClick={() => mobile && setOpen(false)}
      >
        <Link to="/matches" className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>Matches</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        size={mobile ? "lg" : "sm"}
        asChild
        className={mobile ? "w-full justify-start" : ""}
        onClick={() => mobile && setOpen(false)}
      >
        <Link to="/profile" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>Profile</span>
        </Link>
      </Button>
      <Button
        variant="outline"
        size={mobile ? "lg" : "sm"}
        onClick={handleLogout}
        className={mobile ? "w-full justify-start" : ""}
      >
        <LogOut className="h-4 w-4" />
        <span className="ml-2">Sign Out</span>
      </Button>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-105">
            <GraduationCap className="h-5 w-5" />
          </div>
          <span className="text-lg sm:text-xl font-bold text-foreground">
            StudyBuddy<span className="text-primary">Match</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <div className="h-9 w-24 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/subjects" className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Subjects</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/matches" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>Matches</span>
                </Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/profile" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </Button>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                <span className="ml-2">Sign Out</span>
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="accent" size="sm" asChild>
                <Link to="/register">Get Started</Link>
              </Button>
            </>
          )}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          {loading ? (
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12">
                <nav className="flex flex-col gap-2">
                  <NavLinks mobile />
                </nav>
              </SheetContent>
            </Sheet>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="accent" size="sm" asChild>
                <Link to="/register">Start</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
