import { Meta, StoryObj } from "@storybook/react";
import { SocialNetwork } from "../SocialNetwork";
import { SessionProvider } from "next-auth/react";

export default {
  title: "Auth/SocialNetwork",
  component: SocialNetwork,
  decorators: [
    (Story) => (
      <SessionProvider>
        <Story />
      </SessionProvider>
    ),
  ],
  parameters: {
    layout: "centered",
  }
} as Meta<typeof SocialNetwork>;

type Stories = StoryObj<typeof SocialNetwork>;

export const Default: Stories = {};
