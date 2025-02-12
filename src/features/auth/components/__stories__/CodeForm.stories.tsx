import { Meta, StoryObj } from "@storybook/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CodeInput } from "@/components/CodeInput";
import { CodeForm } from "../CodeForm";

const queryClient = new QueryClient();

export default {
  title: "Auth/CodeForm",
  component: CodeInput,
  argTypes: {
    value: {
      description: "Valor do código que chega no email do usuário.",
    },
    onChange: {
      description: "Função chamada quando cada digito do código mudar.",
    },
    onFirstComplete: {
      description:
        "Função chamada quando os 4 campos do código forem preenchidos pela primeira vez.",
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col gap-6">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  },
} as Meta<typeof CodeInput>;

type Stories = StoryObj<typeof CodeInput>;

export const Default: Stories = {
  render: () => <CodeForm />,
};
