import React from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import zhCNMessages from "../../messages/zh-CN.json";

function IntlWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="zh-CN" messages={zhCNMessages}>
      {children}
    </NextIntlClientProvider>
  );
}

export function renderWithIntl(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, { wrapper: IntlWrapper, ...options });
}
