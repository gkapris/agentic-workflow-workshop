import { PageHeading } from "@/components/atoms/page-heading";
import { Flex } from "@chakra-ui/react";
import { getTranslations } from "next-intl/server";

export default async function SpeakersPage() {
  const t = await getTranslations("SpeakersPage");

  return (
    <Flex direction="column" gap="8" flex="1" width="full" minWidth="0">
      <PageHeading title={t("title")}>{t("description")}</PageHeading>
    </Flex>
  );
}
