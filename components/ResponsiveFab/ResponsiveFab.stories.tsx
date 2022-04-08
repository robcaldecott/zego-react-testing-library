import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StarIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { ResponsiveFab } from ".";

export default {
  title: "Components/ResponsiveFab",
  component: ResponsiveFab,
  args: {
    icon: StarIcon,
  },
  argTypes: {
    label: {
      control: {
        type: "text",
      },
    },
    icon: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof ResponsiveFab>;

const Template: ComponentStory<typeof ResponsiveFab> = (args) => (
  <Link href="/" passHref>
    <ResponsiveFab {...args} />
  </Link>
);

export const Star = Template.bind({});
Star.args = {
  label: "Responsive",
};
