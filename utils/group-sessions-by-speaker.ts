import type { Session } from "@/types/session";
import { timeToMinutes } from "@/utils/schedule-time";

export interface SpeakerSessions {
  name: string;
  sessions: Session[];
}

/**
 * Placeholder `speaker` values that name a group, not a person — e.g. the
 * closing panel's "Full speaker lineup". They never get a speaker card.
 */
const NON_SPEAKER_NAMES = new Set(["Full speaker lineup"]);

/**
 * Groups sessions by speaker. Speakers are sorted by name, and each speaker's
 * sessions by start time.
 */
export function groupSessionsBySpeaker(sessions: Session[]): SpeakerSessions[] {
  const bySpeaker = new Map<string, Session[]>();

  for (const session of sessions) {
    const name = session.speaker.trim();
    if (!name || NON_SPEAKER_NAMES.has(name)) continue;

    const group = bySpeaker.get(name);
    if (group) group.push(session);
    else bySpeaker.set(name, [session]);
  }

  return Array.from(bySpeaker, ([name, speakerSessions]) => ({
    name,
    sessions: speakerSessions.toSorted(
      (a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime),
    ),
  })).toSorted((a, b) => a.name.localeCompare(b.name));
}
