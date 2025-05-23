import react from "@astrojs/react";
import starlight from "@astrojs/starlight";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
  integrations: [
    starlight({
      title: "NoCaptchaAi",
      logo: {
        light: "./src/assets/logo.svg",
        dark: "./src/assets/logo.svg",
      },
      favicon:"./logo/logo_light.png",
      customCss: ["./src/styles/custom.css", "./src/styles/tailwind.css"],
      social: {
        github: "https://github.com/alexwhitmore/astro-mintlify",
      },
      components: {
        Header: "./src/components/Header.astro",
      },
      sidebar: [
        {
          label: "Official Links",
          items: [
            {
              label: "🏠 Homepage",
              link: "https://nocaptchaai.com",
            },
            {
              label: "📊 Dashboard",
              link: "https://dash.nocaptchaai.com",
            },
            {
              label: "📈 Uptime",
              link: "https://status.nocaptchaai.com",
            },
          ],
        },
        {
          label: "Get Started",
          autogenerate: { directory: "/start" },
        },
        // {
        //   label: "Essentials",
        //   items: [
        //     {
        //       label: "Creating Pages",
        //       slug: "essentials/creating-pages",
        //     },
        //     {
        //       label: "Theming",
        //       slug: "essentials/theming",
        //     },
        //     {
        //       label: "Images",
        //       slug: "essentials/images",
        //     },
        //     {
        //       label: "Deployments",
        //       slug: "essentials/deployments",
        //     },
        //   ],
        // },
        // {
        //   label: "Components",
        //   items: [
        //     {
        //       label: "Badge",
        //       slug: "components/badge",
        //     },
        //     {
        //       label: "Asides",
        //       slug: "components/asides",
        //     },
        //     {
        //       label: "Tabs",
        //       slug: "components/tabs",
        //     },
        //   ],
        // },
        {
          label: "Products",
          autogenerate: { directory: "/products" },
        },
        {
          label: "Guides",
          autogenerate: { directory: "/guides" },
        },
      ],
      social: {
        email: "mailto:docs@NoCaptchaai.com",
        github: "https://github.com/withastro/starlight",
        discord: "https://github.com/withastro/starlight",
        telegram: "https://github.com/withastro/starlight",
        twitter: "https://github.com/withastro/starlight",
      },
    }),
    tailwind({
      applyBaseStyles: false,
      configFilePath: "./tailwind.config.ts",
    }),
    react(),
  ],
});
