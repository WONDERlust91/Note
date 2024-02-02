import fs from "fs";
import path from "path";
import { DefaultTheme } from "vitepress";
import { srcDir } from "./config.mts";

function generateStructure(directory: string) {
  // Read the directory
  const files = fs.readdirSync(directory);

  // Get creation time for each file and sort in descending order
  const sortedFiles = files.sort((a, b) => {
    const aCreationTime = fs.statSync(path.join(directory, a)).birthtime;
    const bCreationTime = fs.statSync(path.join(directory, b)).birthtime;
    return bCreationTime.getTime() - aCreationTime.getTime();
  });

  // Map to the desired structure
  const structure = sortedFiles.map((file) => {
    const fileName = file.replace(".md", "");
    const link = `/${directory}/${fileName}`;
    return {
      text: fileName,
      link: link,
    };
  });
  return structure;
}

type Structure = { nav: DefaultTheme.NavItem[]; sidebar: DefaultTheme.Sidebar };
export function scanDirectories(directories: string[]): Structure {
  // get project rootDir and change cwd to srcDir
  const projectRoot = process.cwd();
  process.chdir(path.join(projectRoot, srcDir));

  const structure = directories.reduce<Structure>(
    (directories, directory) => {
      // uppercase the first letter of directory as name
      const text = directory.charAt(0).toUpperCase() + directory.slice(1);
      const items = generateStructure(directory);

      directories.sidebar[`/${directory}/`] = [
        {
          text,
          items,
        },
      ];
      // Add the directory to the nav and link to the first item
      directories.nav.push({ text, link: items[0] ? items[0].link : "" });

      return directories;
    },
    { nav: [], sidebar: {} }
  );

  // Change the cwd back to project rootDir
  process.chdir(projectRoot);

  return structure;
}
