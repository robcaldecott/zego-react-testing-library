import { ComponentMeta, Story } from "@storybook/react";
import { ThemeProvider } from "@/providers";
import { Layout } from ".";

export default {
  title: "Components/Layout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} as ComponentMeta<typeof Layout>;

export const WithContent: Story = () => (
  <Layout>
    <div className="w-full text-slate-900 dark:text-white bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 shadow-md rounded-md p-8">
      Content
    </div>
  </Layout>
);
