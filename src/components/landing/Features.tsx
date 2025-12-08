import { Sparkles, Target, Clock, MapPin, Brain, Shield } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Smart Matching",
    description: "Our algorithm considers subjects, exam dates, and learning styles to find your perfect study partner.",
  },
  {
    icon: Clock,
    title: "Availability Sync",
    description: "Match with students who share your schedule—whether you're a morning person or night owl.",
  },
  {
    icon: MapPin,
    title: "Local or Remote",
    description: "Find partners nearby for in-person sessions or connect online with students anywhere.",
  },
  {
    icon: Brain,
    title: "Learning Styles",
    description: "Whether you prefer calm focus or lively discussions, we'll find someone who matches your vibe.",
  },
  {
    icon: Sparkles,
    title: "Exam Focus",
    description: "Connect with students who have exams around the same time for maximum motivation.",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Your privacy matters. Control what you share and communicate on your own terms.",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-20 md:py-28 gradient-subtle">
      <div className="container px-4">
        <div className="mx-auto max-w-2xl text-center mb-10 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to Find Study Partners
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground">
            Built by students, for students. We understand what makes a great study partnership.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-4 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-base sm:text-lg font-semibold">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
