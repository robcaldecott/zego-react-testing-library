import { useState } from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import { Button } from "../Button";
import { Select } from ".";

export default {
  title: "Components/Select",
  component: Select,
  args: {
    children: (
      <>
        <option value="" disabled>
          Select a fruit
        </option>
        <option value="apples">Apples</option>
        <option value="bananas">Bananas</option>
        <option value="oranges">Oranges</option>
      </>
    ),
  },
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => {
  const [value, setValue] = useState(args.value);
  return (
    <Select
      {...args}
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  label: "Label",
  disabled: false,
  isRequired: false,
  value: "",
};

export const Error = Template.bind({});
Error.args = {
  label: "Label",
  disabled: false,
  isRequired: true,
  value: "",
  error: "Please select a fruit",
};
