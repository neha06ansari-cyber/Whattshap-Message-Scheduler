import { useState, useEffect, useCallback } from "react";

export interface ScheduledMessage {
  id: string;
  phone: string;
  message: string;
  scheduledAt: string; // ISO string
  status: "Pending" | "Sent";
}

const STORAGE_KEY = "scheduled-messages";

function loadMessages(): ScheduledMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMessages(msgs: ScheduledMessage[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(msgs));
}

export function useMessages() {
  const [messages, setMessages] = useState<ScheduledMessage[]>(loadMessages);

  // Check for messages that should be marked as "Sent"
  const checkAndUpdate = useCallback(() => {
    const now = new Date();
    setMessages((prev) => {
      let changed = false;
      const updated = prev.map((m) => {
        if (m.status === "Pending" && new Date(m.scheduledAt) <= now) {
          changed = true;
          return { ...m, status: "Sent" as const };
        }
        return m;
      });
      if (changed) saveMessages(updated);
      return changed ? updated : prev;
    });
  }, []);

  useEffect(() => {
    checkAndUpdate();
    const interval = setInterval(checkAndUpdate, 5000);
    return () => clearInterval(interval);
  }, [checkAndUpdate]);

  const addMessage = (phone: string, message: string, scheduledAt: Date) => {
    const newMsg: ScheduledMessage = {
      id: crypto.randomUUID(),
      phone,
      message,
      scheduledAt: scheduledAt.toISOString(),
      status: scheduledAt <= new Date() ? "Sent" : "Pending",
    };
    const updated = [...messages, newMsg];
    saveMessages(updated);
    setMessages(updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    saveMessages(updated);
    setMessages(updated);
  };

  return { messages, addMessage, deleteMessage };
}
