import { renderMarkdown } from "@vuedoc/md";
import fs from "fs";

const componentsPath = 'src/components';
const excludeFolderOrFile = [
  'index.js',
  'Layout'
];
const filenames = fs.readdirSync(componentsPath).map((item) => {
  if (!excludeFolderOrFile.includes(item)) {
    if (!item.includes('.vue')) {
      return `${componentsPath}/${item}/${item}.vue`;
    }
    return `${componentsPath}/${item}`;
  }
}).filter((d) => !!d);

const options = {
  join: false,
  filenames: [...filenames],
  output: "docs/",
};

renderMarkdown(options)
  .then((docs) => {
    docs.forEach((doc) => {
      const title = doc.split("\n")[0].replace("#", "");
      const filename = `${title.trim()}.md`;
      fs.writeFile(`docs/${filename}`, doc, (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  })
  .catch((err) => console.error(err));
