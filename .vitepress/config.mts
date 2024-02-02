import { defineConfig } from "vitepress";
import { scanDirectories } from "../utils/structure.mts";
import { directories,srcDir } from "../utils/config.mts";

const structure = scanDirectories(directories);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notebook",
  description: "English Learning",
  srcDir,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      ...structure.nav,
      { text: "Summary", link: "/summary/lexical_relationships" },
    ],

    sidebar: {
      ...structure.sidebar,
      "/summary/": [
        {
          text: "Summary",
          items: [
            {
              text: "Lexical Relationships",
              link: "/summary/lexical_relationships",
            },
            { text: "Grammar Summary", link: "/summary/grammar_summary" },
            { text: "Glossary", link: "/summary/glossary" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
