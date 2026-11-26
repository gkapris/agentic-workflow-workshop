import { SpeakerCard } from "@/app/[locale]/speakers/_components/speaker-card";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex, Grid } from "@chakra-ui/react";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SpeakersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Without this, getTranslations reads the locale from request headers and
  // the route can no longer be prerendered.
  setRequestLocale(locale);

  const t = await getTranslations("SpeakersPage");
  const speakers = groupSessionsBySpeaker(await fetchSessions());

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>

      <Grid
        as="ul"
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
    </Flex>
  );
}
