import { Link } from "react-router-dom";
import { format } from "date-fns";
import { CalendarPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useMessages } from "@/hooks/useMessages";

export default function Dashboard() {
  const { messages, deleteMessage } = useMessages();

  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <Button asChild size="sm">
          <Link to="/schedule"><CalendarPlus className="mr-2 h-4 w-4" /> New Message</Link>
        </Button>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center shadow-sm">
          <p className="text-muted-foreground">No scheduled messages yet.</p>
          <Button asChild className="mt-4" variant="outline">
            <Link to="/schedule">Schedule your first message</Link>
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Phone</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Scheduled Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-mono text-sm">{m.phone}</TableCell>
                  <TableCell className="max-w-[200px] truncate text-sm">{m.message}</TableCell>
                  <TableCell className="text-sm whitespace-nowrap">
                    {format(new Date(m.scheduledAt), "PPp")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={m.status === "Sent" ? "default" : "secondary"}>
                      {m.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteMessage(m.id)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <p className="mt-8 text-center text-xs text-muted-foreground">
        ⚠️ This project is for educational purposes only. No real WhatsApp messages are sent.
      </p>
    </div>
  );
}
