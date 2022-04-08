import { Meta } from "@storybook/react";
import { Paper, Text, Button } from "@/components";
import { ThemeProvider, useTheme } from ".";

export default {
  title: "Providers/ThemeProvider",
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta;

export const Default = () => {
  const { mode, setMode } = useTheme();
  return (
    <Paper className="p-4 space-y-4">
      <Text variant="h2">Mode: {mode}</Text>
      <Button onClick={() => setMode(mode === "light" ? "dark" : "light")}>
        Toggle
      </Button>
    </Paper>
  );
};
