import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from ".";

export default {
  title: "Components/Button",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: "Button",
  variant: "primary",
  disabled: false,
};
