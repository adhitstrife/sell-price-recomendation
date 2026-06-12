"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSettings } from "@/contexts/SettingsContext";

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBFPZ8AHVPffJEiMhONynOdoMyvpeX5cLIlqfHi4uHGZRfKjgUZF4HTgUU3Ajxd_rLqnYUqI3jxKBlaoEUHeShIKO8p2fcE2LIE9W58S0lZj4bRJ-62HpbS1CydpXCyvDgniSJPbgCOAIdiGAQOs2LEm08kaNpUXgmWy7iBm4BJO4tJ_mxKZv-_j1phhDNrfBBnp-6vR85wLEFoqlrF1SCiFwcGCbVVhIU_b3gLBnvrUGcBZb9sjRJk86_N-Vzd9naXH7bhr2ljVSY";

const PROFILE_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBt_MGlWxUt_GMip4pGpvPGC93P9aGDnWQ2qlNVvdvLi2U-wUjNEk1BAm5RWYVMDX-DntGdpG12CCDXdq-iHP0huAM4LFnkRTHAmy0oAqRRInzcs_bVe-TokvyrC2RlN0wvB3q2mr8N44dsYt-vVvCi5Ne-c9owey6sYjB5eVU2_ctHBbI8VS310-SrWE0TOWSWv2_eGmGxDJjgZvGADjxa0vPlf2yHrEqH3ZpP--Usc4zgNqtTjU-OSnTXKr832-E2uTqGSOA_cV0";

const LandingPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { settings, setLanguage } = useSettings();
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToId = (id: string): void => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-surface text-onSurface">
      {/* LANDING NAV */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-outline-variant bg-surface/80 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => scrollToId("hero")}
              className="font-heading text-title-md font-bold text-primary"
              aria-label="ChefCost home"
            >
              ChefCost
            </button>
            <div className="hidden items-center gap-4 md:flex">
              <button
                type="button"
                onClick={() => scrollToId("features")}
                className="font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:text-primary"
              >
                {t("landing.navFeatures")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("how")}
                className="font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:text-primary"
              >
                {t("landing.navHowItWorks")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("cta")}
                className="font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:text-primary"
              >
                {t("landing.navPricing")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("footer")}
                className="font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:text-primary"
              >
                {t("landing.navResources")}
              </button>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1 rounded-full border border-outline-variant bg-surface-container-lowest p-0.5">
              {(["id", "en"] as const).map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => setLanguage(lng)}
                  className={`rounded-full px-3 py-1 font-heading text-label-md font-medium transition ${
                    settings.language === lng
                      ? "bg-primary text-white"
                      : "text-onSurface-variant hover:text-primary"
                  }`}
                  aria-pressed={settings.language === lng}
                >
                  {t(`lang.${lng}`)}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push("/saved-recipes")}
              className="font-heading text-label-md font-medium text-onSurface-variant transition-colors hover:bg-surface-container-lowest hover:text-primary"
            >
              {t("landing.navLogin")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/calculator")}
              className="rounded-chef-lg bg-primary px-5 py-2 font-heading text-label-md font-bold text-white shadow-chef-sm transition hover:bg-[#26604a] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              {t("landing.navGetStarted")}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="grid h-9 w-9 place-items-center rounded-chef text-onSurface-variant transition hover:bg-surface-container-low sm:hidden"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-outline-variant bg-surface sm:hidden">
            <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3">
              <button
                type="button"
                onClick={() => scrollToId("features")}
                className="rounded-chef px-3 py-2.5 text-left font-heading text-base font-medium text-onSurface-variant transition hover:bg-surface-container-lowest hover:text-primary"
              >
                {t("landing.navFeatures")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("how")}
                className="rounded-chef px-3 py-2.5 text-left font-heading text-base font-medium text-onSurface-variant transition hover:bg-surface-container-lowest hover:text-primary"
              >
                {t("landing.navHowItWorks")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("cta")}
                className="rounded-chef px-3 py-2.5 text-left font-heading text-base font-medium text-onSurface-variant transition hover:bg-surface-container-lowest hover:text-primary"
              >
                {t("landing.navPricing")}
              </button>
              <button
                type="button"
                onClick={() => scrollToId("footer")}
                className="rounded-chef px-3 py-2.5 text-left font-heading text-base font-medium text-onSurface-variant transition hover:bg-surface-container-lowest hover:text-primary"
              >
                {t("landing.navResources")}
              </button>
              <div className="mt-2 flex flex-col gap-2 border-t border-outline-variant pt-3">
                <div className="flex items-center gap-1 self-start rounded-full border border-outline-variant bg-surface-container-lowest p-0.5">
                  {(["id", "en"] as const).map((lng) => (
                    <button
                      key={lng}
                      type="button"
                      onClick={() => setLanguage(lng)}
                      className={`rounded-full px-3 py-1 font-heading text-label-md font-medium transition ${
                        settings.language === lng
                          ? "bg-primary text-white"
                          : "text-onSurface-variant hover:text-primary"
                      }`}
                      aria-pressed={settings.language === lng}
                    >
                      {t(`lang.${lng}`)}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/saved-recipes");
                  }}
                  className="w-full rounded-chef-lg border border-outline px-5 py-2.5 text-left font-heading text-label-md font-medium text-onSurface-variant transition hover:bg-surface-container-lowest"
                >
                  {t("landing.navLogin")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/calculator");
                  }}
                  className="w-full rounded-chef-lg bg-primary px-5 py-2.5 font-heading text-label-md font-bold text-white shadow-chef-sm transition hover:bg-[#26604a]"
                >
                  {t("landing.navGetStarted")}
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="pt-16">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="relative overflow-hidden pt-12 pb-16 sm:pt-16 sm:pb-24 md:pt-20 md:pb-32"
        style={{
          background:
            "radial-gradient(circle at 70% 30%, rgba(149, 212, 179, 0.18) 0%, transparent 55%)",
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
          <div className="z-10 text-center lg:text-left">
            <span className="mb-4 inline-block rounded-full bg-primary-container px-4 py-1 font-heading text-label-md text-on-primary-container">
              {t("landing.heroBadge")}
            </span>
            <h1 className="font-heading text-3xl font-bold leading-tight text-onSurface sm:text-4xl md:text-5xl lg:text-[3.4rem] lg:leading-[1.1]">
              {t("landing.heroTitle1")}
              <br />
              <span className="italic text-primary">
                {t("landing.heroTitle2")}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-onSurface-variant sm:text-lg">
              {t("landing.heroSubtitle")}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-3 lg:justify-start">
              <button
                type="button"
                onClick={() => router.push("/calculator")}
                className="inline-flex w-full items-center justify-center gap-2 rounded-chef-lg bg-primary px-7 py-3.5 font-heading text-base font-bold text-white shadow-chef-lg transition hover:bg-[#26604a] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:w-auto"
              >
                {t("landing.ctaPrimary")}
              </button>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("how");
                  el?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex w-full items-center justify-center gap-2 rounded-chef-lg border border-outline bg-transparent px-7 py-3.5 font-heading text-base font-bold text-primary transition hover:bg-surface-container-low sm:w-auto"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                {t("landing.ctaSecondary")}
              </button>
            </div>
          </div>

          <div className="relative mt-6 flex justify-center lg:mt-0">
            <div className="relative aspect-square w-full max-w-[460px]">
              <div className="overflow-hidden rounded-2xl border border-outline-variant bg-white shadow-chef-overlay">
                <Image
                  src={HERO_IMAGE}
                  alt="Plated dish"
                  width={460}
                  height={460}
                  className="h-full w-full object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 hidden rounded-chef-xl border border-primary/20 bg-white/85 p-4 shadow-chef-overlay backdrop-blur-md sm:block sm:w-60">
                <div className="mb-1.5 flex items-center justify-between">
                  <span className="font-heading text-label-md text-onSurface-variant">
                    {t("landing.floatingCardTitle")}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-primary"
                    aria-hidden="true"
                  >
                    <path d="M3.5 18.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.09-4-4L2 17l1.5 1.5z" />
                  </svg>
                </div>
                <div className="mb-1 font-heading text-2xl font-bold text-primary">
                  {t("landing.floatingCardPrice")}
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-grow overflow-hidden rounded-full bg-surface-container-highest">
                    <div className="h-full w-[32%] rounded-full bg-primary" />
                  </div>
                  <span className="font-heading text-label-md font-bold text-primary">
                    {t("landing.floatingCardMargin")}
                  </span>
                </div>
              </div>
              <div className="absolute -right-3 -top-3 hidden rounded-chef-xl border border-tertiary/20 bg-white/85 px-3 py-2 shadow-chef-lg backdrop-blur-md sm:flex sm:items-center sm:gap-2 sm:animate-pulse">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-tertiary"
                  aria-hidden="true"
                >
                  <path d="M3.5 17.5l6-6 4 4L22 6.92 20.59 5.5l-7.09 8.09-4-4L2 16l1.5 1.5z" />
                </svg>
                <span className="font-heading text-label-md font-bold text-tertiary">
                  {t("landing.floatingBadge")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="bg-surface-container-lowest py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 text-center sm:mb-16">
            <h2 className="font-heading text-2xl font-bold text-onSurface sm:text-3xl">
              {t("landing.problemTitle")}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-onSurface-variant sm:text-base">
              {t("landing.problemSubtitle")}
            </p>
          </div>
          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2">
            <div className="flex flex-col rounded-chef-xl border border-outline-variant bg-surface-container-low p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-error-container">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-error"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M6 18L18 6" />
                  </svg>
                </div>
                <h3 className="font-heading text-title-md text-onSurface">
                  {t("landing.problemCard1Title")}
                </h3>
              </div>
              <ul className="flex-grow space-y-3">
                {[
                  t("landing.problemCard1Item1"),
                  t("landing.problemCard1Item2"),
                  t("landing.problemCard1Item3"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-onSurface-variant">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 shrink-0 text-error"
                      aria-hidden="true"
                    >
                      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-outline-variant/40 pt-5 font-heading text-sm font-bold text-error">
                {t("landing.problemCard1Footer")}
              </div>
            </div>

            <div className="z-10 flex scale-100 flex-col rounded-chef-xl border border-primary bg-primary-container p-6 shadow-chef-overlay md:scale-105">
              <div className="mb-5 flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-fixed">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-primary"
                    aria-hidden="true"
                  >
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                </div>
                <h3 className="font-heading text-title-md text-on-primary-container">
                  {t("landing.problemCard2Title")}
                </h3>
              </div>
              <ul className="flex-grow space-y-3">
                {[
                  t("landing.problemCard2Item1"),
                  t("landing.problemCard2Item2"),
                  t("landing.problemCard2Item3"),
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="mt-0.5 shrink-0 text-on-primary-fixed-variant"
                      aria-hidden="true"
                    >
                      <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.69 3.1 5.5l.34 3.7L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.5l3.4-1.47 3.4 1.46 1.89-3.19 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z" />
                    </svg>
                    <span className="text-on-primary-container">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 border-t border-on-primary-container/20 pt-5 font-heading text-sm font-bold text-on-primary-container">
                {t("landing.problemCard2Footer")}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col justify-between gap-4 sm:mb-16 md:flex-row md:items-end">
            <div className="max-w-xl">
              <h2 className="mb-3 font-heading text-2xl font-bold text-onSurface sm:text-3xl">
                {t("landing.featuresTitle")}
              </h2>
              <p className="text-sm text-onSurface-variant sm:text-base">
                {t("landing.featuresSubtitle")}
              </p>
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 font-heading text-label-md font-bold text-primary"
            >
              {t("landing.footerProductFeatures")}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
              </svg>
            </a>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                titleKey: "feature1Title",
                descKey: "feature1Desc",
                dataKey: "feature1Data",
                icon: (
                  <path d="M7.5 11.5C4.46 11.5 2 9.04 2 6h3c0 1.66 1.12 3 2.5 3S9.5 7.66 9.5 6h3c0 3.04-2.46 5.5-5 5.5zm9 0c-2.49 0-4.5-2.02-4.5-4.5h3c0 1.1.67 2 1.5 2s1.5-.9 1.5-2h3c0 2.48-2.02 4.5-4.5 4.5zM7.5 22c-2.49 0-4.5-2.02-4.5-4.5h3c0 1.1.67 2 1.5 2s1.5-.9 1.5-2h3c0 2.48-2.02 4.5-4.5 4.5zm9 0c-2.49 0-4.5-2.02-4.5-4.5h3c0 1.1.67 2 1.5 2s1.5-.9 1.5-2h3c0 2.48-2.02 4.5-4.5 4.5z" />
                ),
              },
              {
                titleKey: "feature2Title",
                descKey: "feature2Desc",
                dataKey: "feature2Data",
                icon: <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />,
              },
              {
                titleKey: "feature3Title",
                descKey: "feature3Desc",
                dataKey: "feature3Data",
                icon: <path d="M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z" />,
              },
            ].map((feature) => (
              <div
                key={feature.titleKey}
                className="group rounded-chef-xl border border-outline-variant bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:shadow-chef-lg"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-chef-lg bg-surface-container text-primary transition-colors group-hover:bg-primary-container">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    {feature.icon}
                  </svg>
                </div>
                <h3 className="mb-3 font-heading text-title-md text-onSurface">
                  {t(`landing.${feature.titleKey}`)}
                </h3>
                <p className="mb-5 text-sm text-onSurface-variant">
                  {t(`landing.${feature.descKey}`)}
                </p>
                <div className="rounded-chef-lg bg-surface-container-low p-3 font-body text-sm text-onSurface-variant">
                  {t(`landing.${feature.dataKey}`)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how" className="bg-onSurface py-16 text-white sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="mb-12 text-center font-heading text-2xl font-bold sm:mb-16 sm:text-3xl">
            {t("landing.howTitle")}
          </h2>
          <div className="relative grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 md:gap-x-10">
            <div className="absolute left-0 right-0 top-9 hidden h-[2px] bg-primary/30 md:block" />
            {[
              { n: 1, titleKey: "howStep1Title", descKey: "howStep1Desc" },
              { n: 2, titleKey: "howStep2Title", descKey: "howStep2Desc" },
              { n: 3, titleKey: "howStep3Title", descKey: "howStep3Desc" },
              { n: 4, titleKey: "howStep4Title", descKey: "howStep4Desc" },
            ].map((step) => (
              <div
                key={step.n}
                className="relative z-10 flex flex-col items-center text-center"
              >
                <div
                  className="mb-4 grid h-20 w-20 place-items-center rounded-full bg-primary text-2xl font-bold shadow-[0_0_20px_rgba(45,106,79,0.5)]"
                >
                  {step.n}
                </div>
                <h4 className="mb-1.5 font-heading text-title-md text-white">
                  {t(`landing.${step.titleKey}`)}
                </h4>
                <p className="text-sm text-surface-variant">{t(`landing.${step.descKey}`)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="overflow-hidden py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="mb-3 block font-heading text-label-md font-bold uppercase tracking-wider text-primary">
                {t("landing.testimonialBadge")}
              </span>
              <h2 className="mb-8 font-heading text-2xl font-bold text-onSurface sm:text-3xl">
                {t("landing.testimonialTitle")}
              </h2>
              <div className="relative">
                <span
                  className="absolute -left-2 -top-10 select-none font-heading text-7xl text-primary/20 sm:-left-6"
                  aria-hidden="true"
                >
                  &ldquo;
                </span>
                <blockquote className="relative z-10 text-base italic text-onSurface-variant sm:text-lg">
                  &ldquo;{t("landing.testimonialQuote")}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div className="h-16 w-16 overflow-hidden rounded-full border-2 border-primary">
                    <Image
                      src={PROFILE_IMAGE}
                      alt={t("landing.testimonialName")}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-heading text-sm font-bold text-onSurface">
                      {t("landing.testimonialName")}
                    </div>
                    <div className="text-xs text-onSurface-variant">
                      {t("landing.testimonialRole")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { valueKey: "stat1Value", labelKey: "stat1Label", mt: false },
                { valueKey: "stat2Value", labelKey: "stat2Label", mt: true },
                { valueKey: "stat3Value", labelKey: "stat3Label", mt: false },
                { valueKey: "stat4Value", labelKey: "stat4Label", mt: true },
              ].map((stat) => (
                <div
                  key={stat.valueKey}
                  className={`rounded-chef-xl border border-outline-variant bg-surface-container-low p-5 ${
                    stat.mt ? "sm:mt-8" : "sm:-mt-8"
                  }`}
                >
                  <div className="mb-1 font-heading text-3xl font-bold text-primary">
                    {t(`landing.${stat.valueKey}`)}
                  </div>
                  <p className="font-heading text-label-md text-onSurface-variant">
                    {t(`landing.${stat.labelKey}`)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section id="cta" className="px-4 py-16 sm:px-6 sm:py-24">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-chef-xl bg-primary p-10 text-center text-white shadow-chef-overlay sm:p-14">
          <div
            className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <div
            className="absolute -bottom-24 -left-24 h-48 w-48 rounded-full bg-white/5"
            aria-hidden="true"
          />
          <h2 className="relative z-10 mb-3 font-heading text-2xl font-bold sm:text-3xl">
            {t("landing.ctaTitle")}
          </h2>
          <p className="relative z-10 mx-auto mb-8 max-w-2xl text-sm text-primary-onContainer sm:text-base">
            {t("landing.ctaSubtitle")}
          </p>
          <div className="relative z-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={() => router.push("/calculator")}
              className="inline-flex w-full items-center justify-center rounded-chef-lg bg-white px-7 py-3.5 font-heading text-base font-bold text-primary shadow-chef-lg transition hover:bg-surface-container sm:w-auto"
            >
              {t("landing.ctaButtonPrimary")}
            </button>
            <button
              type="button"
              onClick={() => router.push("/saved-recipes")}
              className="inline-flex w-full items-center justify-center rounded-chef-lg border border-white/40 bg-transparent px-7 py-3.5 font-heading text-base font-bold text-white transition hover:bg-white/10 sm:w-auto"
            >
              {t("landing.ctaButtonSecondary")}
            </button>
          </div>
        </div>
      </section>
      </main>

      {/* FOOTER */}
      <footer id="footer" className="border-t border-outline-variant bg-surface-container-lowest py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <span className="mb-4 block font-heading text-title-md font-bold text-primary">
                ChefCost
              </span>
              <p className="mb-5 text-sm text-onSurface-variant">
                {t("landing.footerTagline")}
              </p>
            </div>
            <div className="flex flex-col gap-2.5">
              <h5 className="mb-1 font-heading text-sm font-bold text-onSurface">
                {t("landing.footerProduct")}
              </h5>
              <a
                href="#features"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerProductFeatures")}
              </a>
              <a
                href="#features"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerProductModels")}
              </a>
              <a
                href="#features"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerProductInventory")}
              </a>
              <a
                href="#features"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerProductPricing")}
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <h5 className="mb-1 font-heading text-sm font-bold text-onSurface">
                {t("landing.footerCompany")}
              </h5>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerCompanyAbout")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerCompanyAcademy")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerCompanyStories")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerCompanyPartners")}
              </a>
            </div>
            <div className="flex flex-col gap-2.5">
              <h5 className="mb-1 font-heading text-sm font-bold text-onSurface">
                {t("landing.footerLegal")}
              </h5>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerLegalHelp")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerLegalApi")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerLegalPrivacy")}
              </a>
              <a
                href="#"
                className="text-sm text-onSurface-variant underline transition hover:text-primary"
              >
                {t("landing.footerLegalTerms")}
              </a>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-outline-variant pt-6 md:flex-row">
            <p className="text-xs text-onSurface-variant">
              {t("landing.footerCopyright")}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
