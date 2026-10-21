import { mkdir, readFile, writeFile } from "node:fs/promises";

const home = await readFile("dist/index.html", "utf8");

// Each case-study route is a real static HTML file so it works on any host.
const routes = [
  { dir: "nabd", title: "نبض — Abdulrahman Alferjani" },
  { dir: "luna", title: "لونا ستور — Abdulrahman Alferjani" },
  { dir: "cafe-pos", title: "نظام إدارة الكافيه — Abdulrahman Alferjani" },
];

for (const { dir, title } of routes) {
  await mkdir(`dist/${dir}`, { recursive: true });
  await writeFile(
    `dist/${dir}/index.html`,
    home.replace(
      "<title>عبدالرحمن الفرجاني — من التعقيد إلى الوضوح</title>",
      `<title>${title}</title>`,
    ),
  );
}

// SPA fallback for any other path (e.g. trailing-slash variants on some hosts).
await writeFile("dist/404.html", home);
