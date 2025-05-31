// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightThemeFlexoki from "starlight-theme-flexoki";
import og from "astro-og";
import cloudflare from "@astrojs/cloudflare";
import compressor from "astro-compressor";
import sitemap from "@astrojs/sitemap";
import starlightFullViewMode from "starlight-fullview-mode";

import { viewTransitions } from "astro-vtbot/starlight-view-transitions";
import tailwindcss from "@tailwindcss/vite";
import starlightLlmsTxt from "starlight-llms-txt";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://dcos.nocaptchaai.com/",
  adapter: cloudflare(),
  integrations: [og(), compressor({ gzip: true, brotli: false }), starlight({
    title: "NoCaptchaAI Docs",
    customCss: [
      "./src/styles/global.css",
      "@fontsource/alata/400.css",
      "@fontsource/magra/400.css",
    ],
    logo: {
      src: "./public/logo.svg",
      alt: "NoCaptchaAI Logo",
    },
    description: "Documentation for NoCaptchaAI",
    // plugins: [starlightThemeFlexoki()],
    social: [
      {
        icon: "github",
        label: "GitHub",
        href: "https://github.com/noCaptchaAi/NoCaptcha-Ai-Browser-Extension",
      },
      {
        icon: "email",
        label: "Email",
        href: "mailto:ai@nocaptchaai.com",
      },
      {
        icon: "discord",
        label: "Discord",
        href: "https://discord.com/invite/E7FfzhZqzA",
      },
      {
        icon: "telegram",
        label: "Telegram",
        href: "https://t.me/noCaptchaAi",
      },
    ],
    head: [
      {
        tag: "script",
        attrs: {
          // No src or defer on this main inline script tag itself
        },
        content: `
          (function() {
            // Guard to prevent this whole block from running multiple times
            if (window.allChatbotScriptsInitialized) {
              console.log('Chatbot scripts already initialized or in process.');
              return;
            }
            window.allChatbotScriptsInitialized = true; // Set flag immediately

            console.log('Attempting to load PAPI and Chatwoot scripts...');

            // Function to load the PAPI CDN script
            const loadPapiScript = () => {
              return new Promise((resolve, reject) => {
                // Check if PAPI script is already somehow loaded
                if (document.querySelector('script[src="https://papi.nocaptchaai.com/js/script.js"]')) {
                  console.log('PAPI script tag already found in DOM.');
                  // You might want to check if it's actually functional here,
                  // e.g. if (window.PAPI_GLOBAL_OBJECT) resolve(true);
                  // For now, assuming its presence means it will load/has loaded.
                  resolve(true); 
                  return;
                }

                const script = document.createElement("script");
                script.defer = true; // Defer execution until HTML is parsed
                script.src = "https://papi.nocaptchaai.com/js/script.js";
                script.setAttribute("data-domain", "nocaptchaai.com");

                script.onload = () => {
                  console.log("PAPI script loaded successfully.");
                  resolve(true);
                };
                script.onerror = (err) => {
                  console.error("PAPI CDN script failed to load:", err);
                  reject(new Error("PAPI CDN script failed to load"));
                };
                document.head.appendChild(script);
                console.log('PAPI script appended to head.');
              });
            };

            // Function to initialize Chatwoot
            const initChatwoot = () => {
              // Check if Chatwoot SDK is already loaded or initialized
              if (window.chatwootSDK || document.querySelector('script[src*="/packs/js/sdk.js"]')) {
                console.log("Chatwoot SDK appears to be already loaded or initialized.");
                return;
              }
              console.log("Initializing Chatwoot...");

              const inlineScript = document.createElement("script");
              inlineScript.id = "chatwoot-inline-script";
              inlineScript.textContent = \`
                window.chatwootSettings = {
                  position: "right",
                  type: "expanded_bubble",
                  launcherTitle: "Chat with us",
                };
                (function (d, t) {
                  var BASE_URL = "https://chat.nocaptchaai.com";
                  var g = d.createElement(t),
                    s = d.getElementsByTagName(t)[0];
                  g.src = BASE_URL + "/packs/js/sdk.js";
                  g.defer = true;
                  g.async = true;
                  s.parentNode.insertBefore(g, s);
                  g.onload = function () {
                    console.log("Chatwoot SDK loaded, running Chatwoot.");
                    window.chatwootSDK.run({
                      websiteToken: "vzHddTq5KKQG1YGBbG5zwBc7", // YOUR ACTUAL TOKEN
                      baseUrl: BASE_URL,
                    });
                  };
                  g.onerror = (err) => console.error("Chatwoot SDK script failed to load:", err);
                })(document, "script");
              \`;
              document.head.appendChild(inlineScript);
              console.log('Chatwoot initialization script appended to head.');
            };

            // --- Main Execution Logic ---
            loadPapiScript()
              .then(() => {
                // This block executes ONLY AFTER loadPapiScript's Promise resolves (i.e., PAPI script.onload triggered)
                console.log("PAPI script promise resolved, proceeding to init Chatwoot.");
                initChatwoot();
              })
              .catch(error => {
                console.error("Error in chatbot script loading sequence:", error);
              });
          })();
        `,
      },
    ],
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
        label: "Start Here",
        autogenerate: { directory: "/start" },
      },
      {
        label: "API Reference",
        autogenerate: { directory: "/products" },
      },
      {
        label: "Guides",
        autogenerate: { directory: "/guides" },
      },
    ],
  }), sitemap(), react()],

  vite: {
    plugins: [
      tailwindcss(),
      viewTransitions(),
      // starlightFullViewMode({}),
      starlightLlmsTxt(),
    ],
  },
});