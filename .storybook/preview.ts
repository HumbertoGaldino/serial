import type { Preview } from "@storybook/react";
import { NextIntlClientProvider } from "next-intl";
import { withNextIntl } from "./withNextIntl";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [withNextIntl],
};

export default preview;
