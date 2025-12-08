import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { name: "Impressum", href: "/impressum" },
    { name: "Datenschutz", href: "/datenschutz" },
    { name: "Cookie-Richtlinien", href: "/cookies" },
    { name: "AGB", href: "/agb" },
    { name: "Support / Kontakt", href: "/support" },
  ];

  return (
    <footer className="border-t border-border/50 bg-muted/30 py-10">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* App Information */}
          <div className="space-y-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-lg font-bold">
                StudyBuddy<span className="text-primary">Match</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Study smarter — find your perfect study partner.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Legal & Support</h4>
            <nav className="flex flex-col gap-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className="my-6 bg-border/50" />

        <p className="text-xs text-muted-foreground text-center">
          © {currentYear} StudyBuddy Match. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
