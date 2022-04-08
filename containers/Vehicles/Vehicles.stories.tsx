import { Meta, Story } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { FilterProvider } from "@/providers";
import { Vehicles } from ".";
import { vehicles } from "@/mocks";

export default {
  title: "Containers/Vehicles",
  decorators: [
    (Story) => (
      <FilterProvider>
        <Story />
      </FilterProvider>
    ),
  ],
} as Meta;

export const Loading: Story = () => <Vehicles.Loading />;

export const Empty: Story = () => <Vehicles.Data data={[]} />;

export const Data: Story = () => <Vehicles.Data data={vehicles} />;

export const Error: Story = () => (
  <Vehicles.Error
    error={{ status: 500, statusText: "An error occurred" } as Response}
    refetch={action("refetch")}
  />
);
