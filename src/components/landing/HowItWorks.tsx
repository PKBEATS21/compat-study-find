import { UserPlus, BookOpen, Users, MessageCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: UserPlus,
    title: "Create Your Profile",
    description: "Sign up and tell us about your university, study program, and learning preferences.",
    color: "bg-primary",
  },
  {
    icon: BookOpen,
    title: "Add Your Subjects",
    description: "List your subjects, exam dates, and how challenging you find each one.",
    color: "bg-accent",
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Our algorithm finds students with similar subjects, schedules, and learning styles.",
    color: "bg-primary",
  },
  {
    icon: MessageCircle,
    title: "Connect & Study",
    description: "Reach out to your matches and start studying together for better results.",
    color: "bg-accent",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Finding your ideal study partner is simple. Just follow these four easy steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card key={step.title} variant="elevated" className="relative group">
              {/* Step number */}
              <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background text-sm font-bold shadow-lg">
                {index + 1}
              </div>
              
              {/* Connector line (not on last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 -right-4 w-8 h-0.5 bg-border z-10" />
              )}

              <CardContent className="pt-8 pb-6">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${step.color} text-primary-foreground transition-transform group-hover:scale-110`}>
                  <step.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
