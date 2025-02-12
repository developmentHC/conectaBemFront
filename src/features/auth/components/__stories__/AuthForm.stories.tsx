import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthForm } from "../AuthForm";

const queryClient = new QueryClient();

export default {
  title: "Auth/AuthForm",
  component: AuthForm,
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
} as Meta<typeof AuthForm>;

type Story = StoryObj<typeof AuthForm>;

export const Default: Story = {};