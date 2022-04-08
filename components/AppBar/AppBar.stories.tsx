import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Text } from "../Text";
import { AppBar } from ".";

export default {
  title: "Components/AppBar",
  component: AppBar,
  parameters: {
    layout: "fullscreen",
  },
} as ComponentMeta<typeof AppBar>;

const Template: ComponentStory<typeof AppBar> = ({ children, ...args }) => (
  <AppBar {...args}>
    <Text component="h1" variant="h3" flexGrow={1} color="inherit">
      App Header
    </Text>
  </AppBar>
);

export const Default = Template.bind({});
