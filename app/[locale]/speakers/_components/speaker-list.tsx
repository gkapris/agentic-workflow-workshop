import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import type { SpeakerSessions } from "@/utils/group-sessions-by-speaker";
import { Grid, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

interface SpeakerListProps {
  speakers: SpeakerSessions[];
}

export function SpeakerList({ speakers }: SpeakerListProps) {
  const t = useTranslations("SpeakersPage");

  if (speakers.length === 0) {
    return <Text color="var(--text-secondary)">{t("empty")}</Text>;
  }

  return (
    <Grid
      as="ul"
      // role="list": Safari drops list semantics once list-style is none.
      role="list"
      listStyleType="none"
      templateColumns={{
        base: "1fr",
        sm: "repeat(2, minmax(0, 1fr))",
        md: "repeat(3, minmax(0, 1fr))",
      }}
      gap="4"
    >
      {speakers.map((speaker) => (
        <li key={speaker.name}>
          <SpeakerCard name={speaker.name} sessions={speaker.sessions} />
        </li>
      ))}
    </Grid>
  );
}
