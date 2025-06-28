import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/ambrosiacvet",
      Portfolio: "https://ambrose.cvetkins.space",
      LinkedIn: "https://www.linkedin.com/in/ambrose-hawkins",
      Bluesky: "https://bsky.app/profile/ambrosiacvet.bsky.social",
      RSS: "https://blog.ambrose.cvetkins.space/index.xml",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.Flex({
        components: [
            { Component: Component.PageTitle(), grow: true, align: "stretch", },
            { Component: Component.MobileOnly(Component.Spacer()) },
            { Component: Component.Flex({
              components: [
                {
                  Component: Component.Search(),
                  grow: true,
                },
                { Component: Component.Darkmode() },
                { Component: Component.ReaderMode() },
              ],
            }), align: "center", },
            { 
                Component: Component.DesktopOnly(Component.RecentNotes({
                title: "Recent Posts",
                showTags: false,
            })), align: "start", },
        ],
        direction: "column",
    }),
    Component.Explorer({title: "Archive",}),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer({title: "Archive",}),
  ],
  right: [],
}
