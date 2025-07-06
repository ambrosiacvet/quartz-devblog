import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "The {Darkest} Ambrose",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "goatcounter",
      websiteId: "ambrose",
    },
    locale: "en-US",
    baseUrl: "blog.ambrose.cvetkins.space",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "JetBrains Mono",
        body: "Inter",
        code: "JetBrains",
      },
      colors: {
        lightMode: {
          light: "#fdf9f7",
          lightgray: "#e6dede",
          gray: "#a29d9d",
          darkgray: "#2c2c2c",
          dark: "#2682a6",
          secondary: "#d43958",
          tertiary: "#bfb630",
          highlight: "#fff2ef",
          textHighlight: "#183944",
        },
        darkMode: {
          light: "#140c0c",
          lightgray: "#2a1a1a",
          gray: "#443131",
          darkgray: "#e0e0e0",
          dark: "#2682a6",
          secondary: "#d43958",
          tertiary: "#bfb630",
          highlight: "#261818",
          textHighlight: "#e6f4f8",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: true, disableBrokenWikilinks: true, }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "absolute" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages({ colorScheme: "darkMode" }),
    ],
  },
}

export default config
