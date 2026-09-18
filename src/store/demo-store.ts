"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdvisorTurn, CustomerContext } from "@/domain/advisor";
import { advisorContextDefaults } from "@/domain/advisor";

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  quickReplies?: string[];
}

interface DemoStore {
  messages: ConversationMessage[];
  context: CustomerContext;
  hasStarted: boolean;
  start: () => void;
  addUserMessage: (content: string) => void;
  addAssistantMessage: (turn: AdvisorTurn) => void;
  reset: () => void;
}

export const useDemoStore = create<DemoStore>()(
  persist(
    (set) => ({
      messages: [],
      context: advisorContextDefaults,
      hasStarted: false,
      start: () => set({ hasStarted: true }),
      addUserMessage: (content) => set((state) => ({ messages: [...state.messages, { id: crypto.randomUUID(), role: "user", content }] })),
      addAssistantMessage: (turn) => set((state) => ({
        messages: [...state.messages, { id: crypto.randomUUID(), role: "assistant", content: turn.message, quickReplies: turn.quickReplies }],
        context: { ...state.context, ...turn.contextPatch },
        hasStarted: true,
      })),
      reset: () => set({ messages: [], context: advisorContextDefaults, hasStarted: false }),
    }),
    { name: "olbol-demo-session" },
  ),
);
