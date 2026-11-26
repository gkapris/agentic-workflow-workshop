import { describe, expect, it } from "vitest";

import messages from "@/messages/en.json";
import { render, screen } from "@/tests/utils/render";
import type { Session } from "@/types/session";

import { SpeakerList } from "./speaker-list";

const session: Session = {
  id: "opening-keynote",
  title: "Opening Keynote",
  speaker: "Marta Fernandez",
  track: "React",
  level: "beginner",
  room: "Main Hall",
  startTime: "09:00",
  durationMinutes: 45,
  description: "",
};

describe("SpeakerList", () => {
  it("renders one list item per speaker, in the order given", () => {
    render(
      <SpeakerList
        speakers={[
          { name: "Diego Castellanos", sessions: [{ ...session, id: "a" }] },
          { name: "Marta Fernandez", sessions: [session] },
        ]}
      />,
    );

    const headings = screen.getAllByRole("heading", { level: 2 });

    expect(headings.map((heading) => heading.textContent)).toEqual([
      "Diego Castellanos",
      "Marta Fernandez",
    ]);
    expect(
      screen.queryByText(messages.SpeakersPage.empty),
    ).not.toBeInTheDocument();
  });

  it("shows the empty message instead of a list when there are no speakers", () => {
    render(<SpeakerList speakers={[]} />);

    expect(screen.getByText(messages.SpeakersPage.empty)).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });
});
