import fs from "fs/promises";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const extractPdf = async (filePath) => {
  try {
    const data = await fs.readFile(filePath);

    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(data),
    }).promise;

    let text = "";

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);

      const content = await page.getTextContent();

      const pageText = content.items
        .map((item) => item.str)
        .join(" ");

      text += pageText + "\n";
    }

    return text;
  } catch (error) {
    console.error("PDF Extraction Error:", error);
    throw error;
  }
};

const extractTxt = async (filePath) => {
  return await fs.readFile(filePath, "utf8");
};

const extractMarkdown = async (filePath) => {
  return await fs.readFile(filePath, "utf8");
};

export const extractText = async (filePath, mimeType) => {
  switch (mimeType) {
    case "application/pdf":
      return await extractPdf(filePath);

    case "text/plain":
      return await extractTxt(filePath);

    case "text/markdown":
    case "text/x-markdown":
      return await extractMarkdown(filePath);

    default:
      return "";
  }
};