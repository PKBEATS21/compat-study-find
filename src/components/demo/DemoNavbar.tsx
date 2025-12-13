import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Menu, BookOpen, Users, User, LogIn, Moon, Sun } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTheme } from "next-themes";

export function DemoNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { theme, setTheme, resolvedTheme } = useTheme();

  const isDarkMode = resolvedTheme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Button
        variant="ghost"
        size={mobile ? "default" : "sm"}
        onClick={() => {
          navigate("/demo/subjects");
          if (mobile) setOpen(false);
        }}
        className={mobile ? "w-full justify-start" : ""}
      >
        <BookOpen className="h-4 w-4 mr-2" />
        Subjects
      </Button>
      <Button
        variant="ghost"
        size={mobile ? "default" : "sm"}
        onClick={() => {
          navigate("/demo/matches");
          if (mobile) setOpen(false);
        }}
        className={mobile ? "w-full justify-start" : ""}
      >
        <Users className="h-4 w-4 mr-2" />
        Matches
      </Button>
      <Button
        variant="ghost"
        size={mobile ? "default" : "sm"}
        onClick={() => {
          navigate("/demo/profile");
          if (mobile) setOpen(false);
        }}
        className={mobile ? "w-full justify-start" : ""}
      >
        <User className="h-4 w-4 mr-2" />
        Profile
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
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-hero">
            <Users className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sm sm:text-base">StudyBuddy</span>
          <span className="text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full border border-amber-500/20">
            Demo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          <NavLinks />
          <div className="h-4 w-px bg-border mx-2" />
          <ThemeToggle />
          <Button size="sm" asChild>
            <Link to="/register">
              <LogIn className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10 min-h-[44px] min-w-[44px]">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] pt-10 flex flex-col">
              <nav className="flex flex-col gap-2 flex-1">
                <NavLinks mobile />
                <div className="h-px bg-border my-2" />
                <Button asChild className="w-full">
                  <Link to="/register" onClick={() => setOpen(false)}>
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign Up for Full Access
                  </Link>
                </Button>
              </nav>
              
              {/* Theme Toggle at bottom */}
              <div className="pt-4 border-t border-border">
                <MobileThemeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
