import fs from "fs";

const run = () => {
  const rootDirectory = "/Users/jacovie/Downloads/ISWA2010_Photos/ISWA2010_Png";
  const targetDirectory = "/Users/jacovie/Downloads/ISWA2010_Photos/ISWA2010_Code";
  let id = 0x40001 - 0x60;
  fs.readdirSync(rootDirectory).forEach((filePath) => {
    const filePathSplit = filePath.split("-");
    if (filePathSplit[filePathSplit.length - 1] === "0.png") {
      const angle = filePathSplit[filePathSplit.length - 2];
      if (angle === "01") {
        id += 0x60;
      }

      fs.copyFileSync(`${rootDirectory}/${filePath}`, `${targetDirectory}/code-${id}-angle-${angle}.png`);
    }
  });
};

run();
