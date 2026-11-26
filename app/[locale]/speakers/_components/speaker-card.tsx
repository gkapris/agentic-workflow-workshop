import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Flex, Text } from "@chakra-ui/react";

export type SpeakerSession = Pick<Session, "id" | "title" | "startTime">;

interface SpeakerCardProps {
  name: string;
  sessions: SpeakerSession[];
}

export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card as="article" height="full">
      <CardContent gap="4">
        <CardTitle as="h2" fontSize="lg" fontWeight="semibold">
          {name}
        </CardTitle>

        <Flex as="ul" direction="column" gap="3" listStyleType="none">
          {sessions.map((session) => (
            <li key={session.id}>
              <Link href={`/sessions/${session.id}`}>
                <Flex
                  direction="column"
                  gap="1"
                  _hover={{ textDecoration: "underline" }}
                >
                  <Text as="span" fontSize="xs" color="var(--text-muted)">
                    {session.startTime}
                  </Text>
                  <Text as="span" fontSize="sm" color="var(--text-primary)">
                    {session.title}
                  </Text>
                </Flex>
              </Link>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
