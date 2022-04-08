import { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SearchField } from ".";

export default {
  title: "Components/SearchField",
  component: SearchField,
} as ComponentMeta<typeof SearchField>;

const Template: ComponentStory<typeof SearchField> = (args) => {
  const [value, setValue] = useState("");
  return (
    <SearchField
      value={value}
      onChange={(event) => setValue(event.target.value)}
      {...args}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  placeholder: "Filter vehicles",
  disabled: false,
};
