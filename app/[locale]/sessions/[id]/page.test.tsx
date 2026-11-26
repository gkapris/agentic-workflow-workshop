import { beforeEach, describe, expect, it, vi } from "vitest";

import messages from "@/messages/en.json";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import SessionDetailPage from "./page";

const { fetchSessionById, notFound } = vi.hoisted(() => ({
  fetchSessionById: vi.fn(),
  notFound: vi.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

vi.mock("@/services/sessions", () => ({
  fetchSessionById,
  fetchSessions: vi.fn(),
}));

vi.mock("next/navigation", async (importOriginal) => ({
  ...(await importOriginal<typeof import("next/navigation")>()),
  notFound,
}));

// The real getTranslations reads the request's locale, which a unit test has
// none of — answer from the English catalogue instead.
vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: "Level") => (key: string) =>
    messages[namespace][key as keyof (typeof messages)[typeof namespace]],
}));

const session: Session = {
  id: "rsc-payload-budget",
  title: "Keeping Your RSC Payload on a Diet",
  speaker: "Naia Etxeberria",
  track: "Performance",
  level: "advanced",
  room: "Room B",
  startTime: "11:15",
  durationMinutes: 45,
  description: "Trimming what crosses the server/client boundary.",
};

async function renderPage(id: string) {
  render(await SessionDetailPage({ params: Promise.resolve({ id }) }));
}

describe("SessionDetailPage", () => {
  beforeEach(() => {
    fetchSessionById.mockReset();
    notFound.mockClear();
  });

  it("shows the level as a badge next to the track", async () => {
    fetchSessionById.mockResolvedValue(session);

    await renderPage(session.id);

    expect(screen.getByText("Performance")).toBeInTheDocument();
    expect(screen.getByText("Advanced")).toBeInTheDocument();
  });

  it("shows the not-found page for an unknown session", async () => {
    fetchSessionById.mockResolvedValue(null);

    await expect(renderPage("nope")).rejects.toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalled();
  });
});
