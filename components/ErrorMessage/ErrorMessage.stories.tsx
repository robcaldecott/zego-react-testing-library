import { ComponentMeta, ComponentStory } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Button } from "../Button";
import { ErrorMessage } from ".";

export default {
  title: "Components/ErrorMessage",
  component: ErrorMessage,
  parameters: {
    controls: {
      include: ["error"],
    },
  },
} as ComponentMeta<typeof ErrorMessage>;

const Template: ComponentStory<typeof ErrorMessage> = (args) => (
  <ErrorMessage {...args} />
);

const error = { status: 500, statusText: "An error occurred" } as Response;

export const WithoutAction = Template.bind({});
WithoutAction.args = {
  error,
};

export const WithAction = Template.bind({});
WithAction.args = {
  error,
  action: <Button onClick={action("onClick")}>Action</Button>,
};
