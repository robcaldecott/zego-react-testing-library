import { ComponentMeta, Story, ComponentStory } from "@storybook/react";
import { Paper } from "../Paper";
import { List, ListItem, ListItemText } from ".";

export default {
  title: "Components/List",
  component: List,
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof List>;

const Template: ComponentStory<typeof List> = (args) => (
  <Paper>
    <List {...args} />
  </Paper>
);

const data = [
  {
    primary: "The quick brown fox jumps over the lazy dog.",
    secondary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    primary:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    secondary:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export const Static = Template.bind({});
Static.args = {
  children: (
    <>
      {data.map(({ primary, secondary }, index) => (
        <ListItem key={index}>
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      ))}
    </>
  ),
  dividers: true,
  padding: false,
};

export const Buttons = Template.bind({});
Buttons.args = {
  children: (
    <>
      {data.map(({ primary, secondary }, index) => (
        <ListItem key={index} button component="button">
          <ListItemText primary={primary} secondary={secondary} />
        </ListItem>
      ))}
    </>
  ),
  dividers: true,
  padding: false,
};
