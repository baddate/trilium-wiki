// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://trilium.smj.im",
  output: "static",
  integrations: [
    starlight({
      title: "Trilium Wiki",
      head: [
        {
          tag: "script",
          attrs: {
            async: true,
            src: "https://um.smj.im/script.js",
            "data-website-id": "18a0eed6-0ac3-42c6-916d-9b75a0004ad0",
          },
        },
      ],
      defaultLocale: "zh-CN",
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/baddate/trilium-wiki",
        },
      ],
      sidebar: [
        {
          label: "Home",
          items: ["译者注", "演示截图"],
        },
        {
          label: "文档",
          items: [{ autogenerate: { directory: "文档" } }],
        },
        {
          label: "导航",
          items: [{ autogenerate: { directory: "导航" } }],
        },
        {
          label: "自定义主题",
          items: [{ autogenerate: { directory: "主题" } }],
        },
        {
          label: "键盘快捷键",
          items: ["键盘快捷键"],
        },
        {
          label: "网页剪切程序",
          items: ["网页剪切程序"],
        },
        {
          label: "安装及配置",
          items: [
            {
              label: "安装",
              items: [
                {
                  label: "客户端",
                  items: [{ autogenerate: { directory: "安装/客户端" } }],
                },
                {
                  label: "服务器",
                  items: [{ autogenerate: { directory: "安装/服务器" } }],
                },
              ],
            },
            {
              label: "升级",
              items: [{ autogenerate: { directory: "升级" } }],
            },
            {
              label: "同步",
              items: ["同步"],
            },
            {
              label: "共享",
              items: ["共享"],
            },
            {
              label: "备份",
              items: [{ autogenerate: { directory: "备份" } }],
            },
          ],
        },
        {
          label: "进阶使用",
          items: [
            {
              label: "属性",
              items: [{ autogenerate: { directory: "属性" } }],
            },
            {
              label: "代码笔记",
              items: [{ autogenerate: { directory: "代码笔记" } }],
            },
            {
              label: "高级用例",
              items: [{ autogenerate: { directory: "高级用例" } }],
            },
          ],
        },
        {
          label: "其他",
          items: [{ autogenerate: { directory: "其他" } }],
        },
      ],
    }),
  ],
});
