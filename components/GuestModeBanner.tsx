"use client";

import { useTranslation } from "react-i18next";

const GuestModeBanner = () => {
  const { t } = useTranslation();

  const onLogin = (): void => {
    window.alert(t("guest.loginRequiredTitle", "Login Required"));
  };
  const onSignUp = (): void => {
    window.alert(t("guest.loginRequiredTitle", "Login Required"));
  };

  return (
    <div
      className="rounded-chef-xl bg-tertiary-container px-4 py-3 text-on-tertiary-container shadow-chef-sm sm:px-5"
      role="status"
      data-testid="guest-mode-banner"
    >
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="mt-0.5 shrink-0"
            aria-hidden="true"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
          <p className="font-heading text-label-md">
            {t(
              "guest.banner",
              "You are in Guest Mode. To save your recipe and access historical data, please Log In or Create an Account."
            )}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onLogin}
            className="rounded-chef-lg bg-on-tertiary-container px-4 py-1.5 font-heading text-label-md font-bold text-tertiary-container transition hover:brightness-110"
          >
            {t("guest.login", "Log In")}
          </button>
          <button
            type="button"
            onClick={onSignUp}
            className="rounded-chef-lg border border-on-tertiary-container px-4 py-1.5 font-heading text-label-md font-bold text-on-tertiary-container transition hover:bg-on-tertiary-container/10"
          >
            {t("guest.signUp", "Sign Up")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestModeBanner;
