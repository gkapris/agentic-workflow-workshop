import { Card as ChakraCard } from "@chakra-ui/react";
import type { ReactNode } from "react";

/**
 * The card owns its look: callers pick a named `variant` / `size` and pass
 * children, never style props. A parent that needs to position a card does it
 * with its own wrapper.
 */

interface CardProps {
  children: ReactNode;
  /** `interactive`: the whole card is a link target and highlights on hover. */
  variant?: "static" | "interactive";
}

const cardVariantStyles = {
  static: {},
  interactive: {
    transition: "border-color 0.2s",
    _hover: { borderColor: "var(--card-border-hover-hex)" },
  },
} as const;

export function Card({ children, variant = "static" }: CardProps) {
  return (
    <ChakraCard.Root
      height="full"
      css={{
        background: "var(--card-bg)",
        borderColor: "var(--card-border-hex)",
        color: "var(--text-primary)",
      }}
      {...cardVariantStyles[variant]}
    >
      {children}
    </ChakraCard.Root>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <ChakraCard.Header>{children}</ChakraCard.Header>;
}

interface CardTitleProps {
  children: ReactNode;
  /** Heading level; defaults to h3. */
  as?: "h2" | "h3" | "h4";
  /** `lg` (default) for a card's main subject, `md` for list-style cards. */
  size?: "md" | "lg";
}

const cardTitleSizeStyles = {
  lg: {},
  md: { fontSize: "md" },
} as const;

export function CardTitle({ children, as, size = "lg" }: CardTitleProps) {
  return (
    <ChakraCard.Title as={as} {...cardTitleSizeStyles[size]}>
      {children}
    </ChakraCard.Title>
  );
}

export function CardDescription({ children }: { children: ReactNode }) {
  return (
    <ChakraCard.Description css={{ color: "var(--text-muted)" }}>
      {children}
    </ChakraCard.Description>
  );
}

export function CardContent({ children }: { children: ReactNode }) {
  return <ChakraCard.Body>{children}</ChakraCard.Body>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return <ChakraCard.Footer>{children}</ChakraCard.Footer>;
}
