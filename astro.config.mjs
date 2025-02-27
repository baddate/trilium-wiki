// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    site: 'https://beta.trilium.smj.im',
    integrations: [
        starlight({
            title: 'Trilium Wiki',
            locales: {
                root: {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
            },
            social: {
                github: 'https://github.com/baddate/trilium-wiki',
            },
            sidebar: [
                {
                    label: 'Home',
                    items: ['译者注', '演示截图'],
                },
                {
                    label: '文档',
                    autogenerate: { directory: '文档' },
                },
                {
                    label: '导航',
                    autogenerate: { directory: '导航' },
                },
                {
                    label: '自定义主题',
                    autogenerate: { directory: '主题' },
                },
                {
                    label: '键盘快捷键',
                    items: ['键盘快捷键'],
                },
                {
                    label: '网页剪切程序',
                    items: ['网页剪切程序'],
                },
                {
                    label: '安装及配置',
                    items: [
                        {
                            label: '安装',
                            items: [
                                {
                                    label: '客户端',
                                    autogenerate: { directory: '安装/客户端' },
                                },
                                {
                                    label: '服务器',
                                    autogenerate: { directory: '安装/服务器' },
                                },
                            ],
                        },
                        {
                            label: '升级',
                            autogenerate: { directory: '升级' },
                        },
                        {
                            label: '同步',
                            items: ['同步'],
                        },
                        {
                            label: '共享',
                            items: ['共享'],
                        },
                        {
                            label: '备份',
                            autogenerate: { directory: '备份' },
                        },
                    ],
                },
                {
                    label: '进阶使用',
                    items: [
                        {
                            label: '属性',
                            autogenerate: { directory: '属性' },
                        },
                        {
                            label: '代码笔记',
                            autogenerate: { directory: '代码笔记' },
                        },
                        {
                            label: '高级用例',
                            autogenerate: { directory: '高级用例' },
                        },
                    ],
                },
                {
                    label: '其他',
                    autogenerate: { directory: '其他' },
                },
            ],
        }),
    ],
});
