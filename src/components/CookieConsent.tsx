import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCookieConsent } from "@/contexts/CookieConsentContext";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const { showBanner, acceptCookies, declineCookies } = useCookieConsent();

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="mx-auto max-w-lg rounded-xl border border-border bg-card shadow-lg">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
              <Cookie className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Cookie-Einstellungen</h3>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed mb-4">
            StudyBuddy Match uses cookies to improve your experience. You can accept or decline non-essential cookies.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={acceptCookies}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Accept All
            </Button>
            <Button
              onClick={declineCookies}
              variant="outline"
              className="w-full"
            >
              Decline
            </Button>
            <Link
              to="/cookies"
              className="text-center text-sm text-primary hover:underline py-2"
            >
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
