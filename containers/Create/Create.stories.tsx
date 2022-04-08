import { ComponentMeta, Story } from "@storybook/react";
import { Create } from ".";

export default {
  title: "Containers/Create",
  component: Create,
} as ComponentMeta<typeof Create>;

export const Default: Story = () => <Create />;
