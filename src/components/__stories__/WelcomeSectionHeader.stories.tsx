import { Meta, StoryObj } from "@storybook/react";
import { WelcomeSectionHeader } from "../WelcomeSectionHeader";

export default {
  title: "Auth/WelcomeSectionHeader",
  component: WelcomeSectionHeader,
  args: {
    title: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    href: "/",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    progress: 20,
  },
  argTypes: {
    title: {
      control: "text",
      description: "Título principal da sessão.",
    },
    href: {
      control: "text",
      description: "Link de retorno para uma página anterior.",
    },
    description: {
      control: "text",
      description: "Descrição da sessão atual.",
    },
    progress: {
      control: "number",
      description: "Progresso do cadastro do cliente ou profissional.",
    },
  },
  parameters: {
    layout: "centered",
  },
} as Meta<typeof WelcomeSectionHeader>;

type Story = StoryObj<typeof WelcomeSectionHeader>;

export const Default: Story = {};

export const Completed: Story = {
  args: {
    progress: 100,
  },
};
