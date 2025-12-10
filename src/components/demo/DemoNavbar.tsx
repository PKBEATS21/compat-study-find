import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, BookOpen, Users, User, LogIn } from "lucide-react";
import { useState } from "react";

export function DemoNavbar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

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
          <Button size="sm" asChild>
            <Link to="/register">
              <LogIn className="h-4 w-4 mr-2" />
              Sign Up
            </Link>
          </Button>
        </nav>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] pt-10">
            <nav className="flex flex-col gap-2">
              <NavLinks mobile />
              <div className="h-px bg-border my-2" />
              <Button asChild className="w-full">
                <Link to="/register" onClick={() => setOpen(false)}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign Up for Full Access
                </Link>
              </Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
