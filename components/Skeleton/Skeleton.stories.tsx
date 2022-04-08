import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Skeleton } from "./Skeleton";

export default {
  title: "Components/Skeleton",
  component: Skeleton,
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => (
  <Skeleton {...args} />
);

export const Default = Template.bind({});

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  height: 96,
};
