import { ComponentMeta, Story } from "@storybook/react";
import { Text } from "../Text";
import { Paper } from ".";

export default {
  title: "Components/Paper",
} as ComponentMeta<typeof Paper>;

export const Default: Story = () => (
  <Paper className="p-4">
    <Text variant="h1">Paper</Text>
  </Paper>
);

export const Section: Story = () => (
  <Paper component="section" className="p-4">
    <Text variant="h1">Section</Text>
  </Paper>
);
