import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { CalendarIcon, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useMessages } from "@/hooks/useMessages";
import { toast } from "sonner";

export default function Schedule() {
  const navigate = useNavigate();
  const { addMessage } = useMessages();
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date>();
  const [hour, setHour] = useState("09");
  const [minute, setMinute] = useState("00");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !message.trim() || !date) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!/^\d{10,15}$/.test(phone.replace(/[\s\-\+]/g, ""))) {
      toast.error("Enter a valid mobile number (10-15 digits)");
      return;
    }

    const scheduled = new Date(date);
    scheduled.setHours(parseInt(hour), parseInt(minute), 0, 0);

    addMessage(phone.trim(), message.trim(), scheduled);
    toast.success("Message scheduled successfully!");
    navigate("/dashboard");
  };

  const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, "0"));
  const minutes = Array.from({ length: 12 }, (_, i) => (i * 5).toString().padStart(2, "0"));

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold text-foreground">Schedule a Message</h1>

      <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border bg-card p-6 shadow-sm">
        <div className="space-y-2">
          <Label htmlFor="phone">Mobile Number</Label>
          <Input
            id="phone"
            placeholder="e.g. 9876543210"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            maxLength={15}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="msg">Message</Label>
          <Textarea
            id="msg"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            maxLength={1000}
            rows={4}
          />
          <p className="text-xs text-muted-foreground">{message.length}/1000</p>
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Hour</Label>
            <Select value={hour} onValueChange={setHour}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {hours.map((h) => (
                  <SelectItem key={h} value={h}>{h}:00</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Minute</Label>
            <Select value={minute} onValueChange={setMinute}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {minutes.map((m) => (
                  <SelectItem key={m} value={m}>:{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button type="submit" className="w-full" size="lg">
          <Send className="mr-2 h-4 w-4" /> Schedule Message
        </Button>
      </form>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        ⚠️ This project is for educational purposes only.
      </p>
    </div>
  );
}
