import { NextIntlClientProvider } from "next-intl";
import type { Decorator } from "@storybook/react";

export const withNextIntl: Decorator = (Story, context) => {
  const messages = {
    profile: {
      title: "Profile",
      followers: "Followers",
      following: "Following",
    },
  };

  return (
    <NextIntlClientProvider locale="en" messages={messages}>
      <Story {...context} />
    </NextIntlClientProvider>
  );
};
