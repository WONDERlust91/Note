import { defineConfig } from "vitepress";
import { scanDirectories } from "../utils/structure.mts";
import { directories, srcDir } from "../utils/config.mts";

const structure = scanDirectories(directories);

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Notebook",
  description: "English Learning",
  srcDir,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
      options: {
        miniSearch: {
          options: {
            // 默认使用空格与标点符号分词，这里仅使用空格分词
            tokenize: (text, _fieldName) => text.split(/\s+/),
          },
          searchOptions: {
            // 禁用模糊搜索
            fuzzy: false,
          },
        },
      },
    },

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
      { icon: "github", link: "https://github.com/WONDERlust91/note" },
    ],
  },
});
