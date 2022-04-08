import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Button } from "@/components";
import { Alert } from ".";

export default {
  title: "Components/Alert",
  component: Alert,
} as ComponentMeta<typeof Alert>;

const Template: ComponentStory<typeof Alert> = (args) => <Alert {...args} />;

export const NoAction = Template.bind({});
NoAction.args = {
  label: "This is an alert without an action.",
};

export const WithAction = Template.bind({});
WithAction.args = {
  label: "This is an alert with an action button.",
  action: <Button variant="secondary">Action</Button>,
};
