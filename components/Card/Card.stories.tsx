import { ComponentMeta } from "@storybook/react";
import { Button } from "../Button";
import { Text } from "../Text";
import { Card, CardHeader, CardContent, CardActions } from ".";

export default {
  title: "Components/Card",
} as ComponentMeta<typeof Card>;

export const Default = () => (
  <Card>
    <CardHeader
      title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      subheader="Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      divider
    />
    <CardContent divider>
      <Text>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </Text>
    </CardContent>
    <CardActions>
      <Button>Action</Button>
    </CardActions>
  </Card>
);
