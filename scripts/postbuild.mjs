import { mkdir, readFile, writeFile } from "node:fs/promises";
await mkdir("dist/nabd", { recursive: true });
let html = await readFile("dist/index.html", "utf8");
await writeFile(
  "dist/nabd/index.html",
  html.replace(
    "<title>عبدالرحمن الفرجاني — من التعقيد إلى الوضوح</title>",
    "<title>نبض — Abdulrahman Alferjani</title>",
  ),
);
await writeFile("dist/404.html", html);
