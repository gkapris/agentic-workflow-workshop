import { Card, CardContent, CardTitle } from "@/components/atoms/card";
import { Link } from "@/i18n/navigation";
import type { Session } from "@/types/session";
import { Box, Flex, Text } from "@chakra-ui/react";

export type SpeakerSession = Pick<Session, "id" | "title" | "startTime">;

interface SpeakerCardProps {
  name: string;
  sessions: SpeakerSession[];
}

export function SpeakerCard({ name, sessions }: SpeakerCardProps) {
  return (
    <Card height="full">
      <CardContent gap="4">
        <CardTitle as="h2" fontSize="lg" fontWeight="semibold">
          {name}
        </CardTitle>

        {/* role="list": Safari drops list semantics once list-style is none. */}
        <Flex
          as="ul"
          role="list"
          direction="column"
          gap="3"
          listStyleType="none"
        >
          {sessions.map((session) => (
            <li key={session.id}>
              <Box
                asChild
                display="flex"
                flexDirection="column"
                gap="1"
                borderRadius="sm"
                _focusVisible={{
                  outline: "2px solid var(--accent-hex)",
                  outlineOffset: "2px",
                }}
                css={{
                  // The title is the link's first child; darken its underline.
                  "&:hover > :first-child, &:focus-visible > :first-child": {
                    textDecorationColor: "var(--text-primary)",
                  },
                }}
              >
                <Link href={`/sessions/${session.id}`}>
                  <Text
                    as="span"
                    fontSize="sm"
                    color="var(--text-primary)"
                    textDecoration="underline"
                    textDecorationColor="var(--text-muted)"
                    textUnderlineOffset="3px"
                  >
                    {session.title}
                  </Text>
                  <Text asChild fontSize="xs" color="var(--text-secondary)">
                    <time dateTime={session.startTime}>
                      {session.startTime}
                    </time>
                  </Text>
                </Link>
              </Box>
            </li>
          ))}
        </Flex>
      </CardContent>
    </Card>
  );
}
