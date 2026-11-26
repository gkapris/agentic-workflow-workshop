import { SpeakerList } from "@/app/[locale]/speakers/_components/speaker-list";
import { PageHeading } from "@/components/atoms/page-heading";
import { fetchSessions } from "@/services/sessions";
import { groupSessionsBySpeaker } from "@/utils/group-sessions-by-speaker";
import { Flex } from "@chakra-ui/react";
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

      <SpeakerList speakers={speakers} />
    </Flex>
  );
}
