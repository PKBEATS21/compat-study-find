import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { GraduationCap, LogOut, User, BookOpen, Users, Menu, Moon, Sun } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

export function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

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

  const isDarkMode = resolvedTheme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
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

  const MobileThemeToggle = () => (
    <div 
      className="flex items-center justify-between w-full min-h-[44px] px-4 py-3 rounded-lg bg-muted/50 cursor-pointer touch-manipulation"
      onClick={handleThemeToggle}
      role="button"
      aria-label="Toggle dark mode"
    >
      <div className="flex items-center gap-3">
        {isDarkMode ? (
          <Moon className="h-5 w-5 text-primary" />
        ) : (
          <Sun className="h-5 w-5 text-primary" />
        )}
        <span className="text-sm font-medium">Dark Mode</span>
      </div>
      <Switch 
        checked={isDarkMode} 
        onCheckedChange={() => setTheme(isDarkMode ? "light" : "dark")}
        aria-label="Toggle dark mode"
      />
    </div>
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
          {loading ? (
            <div className="h-9 w-9 animate-pulse rounded-lg bg-muted" />
          ) : user ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12 flex flex-col">
                <nav className="flex flex-col gap-2 flex-1">
                  <NavLinks mobile />
                </nav>
                
                {/* Theme Toggle at bottom */}
                <div className="pt-4 border-t border-border">
                  <MobileThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px]">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 pt-12 flex flex-col">
                <nav className="flex flex-col gap-2 flex-1">
                  <Button variant="ghost" size="lg" asChild className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link to="/login">Sign In</Link>
                  </Button>
                  <Button variant="accent" size="lg" asChild className="w-full justify-start" onClick={() => setOpen(false)}>
                    <Link to="/register">Get Started</Link>
                  </Button>
                </nav>
                
                {/* Theme Toggle at bottom */}
                <div className="pt-4 border-t border-border">
                  <MobileThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
}
