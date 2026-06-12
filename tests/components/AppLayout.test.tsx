import { describe, it, expect, beforeEach, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../../i18n/config";
import { SettingsProvider } from "../../contexts/SettingsContext";
import { RecipeProvider } from "../../contexts/RecipeContext";
import { AlertProvider } from "../../contexts/AlertContext";
import AppLayout from "../../components/AppLayout";

const pushMock = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
  usePathname: () => "/calculator",
}));

const wrap = (ui: React.ReactNode) => (
  <I18nextProvider i18n={i18n}>
    <SettingsProvider>
      <RecipeProvider>
        <AlertProvider>
          <AppLayout>{ui}</AppLayout>
        </AlertProvider>
      </RecipeProvider>
    </SettingsProvider>
  </I18nextProvider>
);

beforeEach(() => {
  pushMock.mockReset();
  localStorage.clear();
});

describe("AppLayout", () => {
  it("renders ChefCost logo in header", () => {
    render(wrap(<div>content</div>));
    expect(screen.getByText("ChefCost")).toBeInTheDocument();
  });

  it("renders all 3 nav links", () => {
    render(wrap(<div>content</div>));
    expect(screen.getByRole("button", { name: /Beranda|Home/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Kalkulator|Calculator/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Resep Tersimpan|Saved Recipes/i })).toBeInTheDocument();
  });

  it("renders Login and Get Started buttons", () => {
    render(wrap(<div>content</div>));
    expect(screen.getByRole("button", { name: /Masuk|^Login$/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Mulai Sekarang|Get Started/i })).toBeInTheDocument();
  });

  it("renders main content area", () => {
    render(wrap(<div data-testid="content">hello</div>));
    expect(screen.getByTestId("content")).toBeInTheDocument();
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("does not show alerts area when no alerts", () => {
    render(wrap(<div>content</div>));
    expect(screen.queryByRole("region", { name: /alerts/i })).not.toBeInTheDocument();
  });
});