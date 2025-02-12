import type { Preview } from "@storybook/react";
import { initialize, mswLoader } from 'msw-storybook-addon'
import "../src/app/globals.css";

initialize()

const preview: Preview = {
  parameters: {
    nextjs: {
      router: {
        basePath: "/app/",
      },
      appDirectory: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        {
          name: "default",
          value: "#F3F5FA",
        },
      ],
    },
  },
  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
