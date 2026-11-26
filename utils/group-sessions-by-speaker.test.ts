import { describe, expect, it } from "vitest";

import type { Session } from "@/types/session";

import { groupSessionsBySpeaker } from "./group-sessions-by-speaker";

function session(overrides: Partial<Session> = {}): Session {
  return {
    id: "a-session",
    title: "A session",
    speaker: "A speaker",
    track: "React",
    room: "Main Hall",
    startTime: "09:00",
    durationMinutes: 45,
    description: "",
    ...overrides,
  };
}

describe("groupSessionsBySpeaker", () => {
  it("returns one entry per speaker, sorted by name", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Pablo Iglesias" }),
      session({ id: "s2", speaker: "Diego Castellanos" }),
      session({ id: "s3", speaker: "Marta Fernandez" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Diego Castellanos",
      "Marta Fernandez",
      "Pablo Iglesias",
    ]);
  });

  it("collects every session a speaker gives, sorted by start time", () => {
    const [speaker] = groupSessionsBySpeaker([
      session({ id: "late", speaker: "Iker Otxoa", startTime: "15:00" }),
      session({ id: "early", speaker: "Iker Otxoa", startTime: "09:30" }),
    ]);

    expect(speaker.name).toBe("Iker Otxoa");
    expect(speaker.sessions.map((s) => s.id)).toEqual(["early", "late"]);
  });

  it("leaves out the closing panel's 'Full speaker lineup'", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "closing-panel", speaker: "Full speaker lineup" }),
      session({ id: "keynote", speaker: "Marta Fernandez" }),
    ]);

    expect(speakers.map((speaker) => speaker.name)).toEqual([
      "Marta Fernandez",
    ]);
  });

  it("treats names that differ only by surrounding whitespace as one speaker", () => {
    const speakers = groupSessionsBySpeaker([
      session({ id: "s1", speaker: "Naia Etxeberria" }),
      session({ id: "s2", speaker: " Naia Etxeberria " }),
    ]);

    expect(speakers).toHaveLength(1);
    expect(speakers[0].sessions).toHaveLength(2);
  });

  it("returns an empty list when there are no sessions", () => {
    expect(groupSessionsBySpeaker([])).toEqual([]);
  });
});
