import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Breadcrumbs } from ".";

export default {
  title: "Components/Breadcrumbs",
  component: Breadcrumbs,
} as ComponentMeta<typeof Breadcrumbs>;

const Template: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args} />
);

export const HomeOnly = Template.bind({});

export const RegistrationNumber = Template.bind({});
RegistrationNumber.args = {
  registrationNumber: "ABC 123",
};
