import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarPlus, LayoutDashboard, Clock, MessageSquare } from "lucide-react";

const features = [
  { icon: CalendarPlus, title: "Schedule Messages", desc: "Set date & time for your messages" },
  { icon: Clock, title: "Auto Status Update", desc: "Status changes to Sent automatically" },
  { icon: LayoutDashboard, title: "Dashboard View", desc: "Track all your scheduled messages" },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <MessageSquare className="h-8 w-8" />
        </div>
        <h1 className="mb-3 text-4xl font-bold tracking-tight text-foreground">
          WhatsApp Message Scheduler
        </h1>
        <p className="mx-auto max-w-lg text-lg text-muted-foreground">
          A college project that simulates scheduling WhatsApp messages. Pick a time, write your message, and watch the status update automatically.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/schedule">
              <CalendarPlus className="mr-2 h-4 w-4" /> Schedule a Message
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> View Dashboard
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-xl border bg-card p-6 text-center shadow-sm">
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <f.icon className="h-5 w-5" />
            </div>
            <h3 className="mb-1 font-semibold text-card-foreground">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        ⚠️ This project is for educational purposes only. No real WhatsApp messages are sent.
      </p>
    </div>
  );
}
