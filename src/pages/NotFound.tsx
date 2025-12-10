import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard, SearchX } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-md text-center">
          {/* Illustration */}
          <div className="mx-auto mb-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
            <SearchX className="h-16 w-16 text-primary" strokeWidth={1.5} />
          </div>
          
          {/* 404 Badge */}
          <div className="mb-4 inline-block rounded-full bg-muted px-4 py-1.5 text-sm font-medium text-muted-foreground">
            404 Error
          </div>
          
          {/* Headline */}
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Oops! This page doesn't exist.
          </h1>
          
          {/* Subtext */}
          <p className="mb-8 text-base text-muted-foreground">
            Looks like you took a wrong turn. Want to head back?
          </p>
          
          {/* Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button asChild className="w-full sm:w-auto">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            
            {!loading && user && (
              <Button asChild variant="outline" className="w-full sm:w-auto">
                <Link to="/subjects">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </Link>
              </Button>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
