import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero opacity-95" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary-foreground/10 blur-3xl animate-float" />
        <div className="absolute top-1/2 -left-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute -bottom-20 right-1/4 h-40 w-40 rounded-full bg-accent/20 blur-2xl animate-float" style={{ animationDelay: "4s" }} />
      </div>

      <div className="container relative z-10 px-4 py-16 sm:py-24 md:py-32 lg:py-40">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs sm:text-sm text-primary-foreground backdrop-blur-sm animate-slide-down">
            <Users className="h-3 w-3 sm:h-4 sm:w-4" />
            <span>Join 10,000+ students finding study partners</span>
          </div>

          <h1 className="mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-primary-foreground animate-slide-up">
            Find Your Perfect{" "}
            <span className="relative inline-block">
              Study Partner
              <svg
                className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 8.5C50 2.5 150 2.5 298 8.5"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="text-accent"
                />
              </svg>
            </span>{" "}
            in Minutes
          </h1>

          <p className="mb-8 sm:mb-10 text-base sm:text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto animate-slide-up px-2" style={{ animationDelay: "0.1s" }}>
            Connect with compatible learning partners based on your subjects, exam dates, 
            learning style, and availability. Studying together has never been easier.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up px-4" style={{ animationDelay: "0.2s" }}>
            <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/register">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="hero-outline" size="lg" asChild className="w-full sm:w-auto">
              <Link to="/login">
                Sign In
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 sm:mt-16 grid grid-cols-3 gap-4 sm:gap-8 animate-slide-up" style={{ animationDelay: "0.3s" }}>
            {[
              { label: "Active Students", value: "10K+" },
              { label: "Matches Made", value: "25K+" },
              { label: "Universities", value: "500+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-primary-foreground">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-foreground/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 sm:h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 50L48 45.7C96 41.3 192 32.7 288 35.8C384 39 480 54 576 60.2C672 66.3 768 63.7 864 55.5C960 47.3 1056 33.7 1152 30.5C1248 27.3 1344 34.7 1392 38.3L1440 42V100H1392C1344 100 1248 100 1152 100C1056 100 960 100 864 100C768 100 672 100 576 100C480 100 384 100 288 100C192 100 96 100 48 100H0V50Z"
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  );
}
