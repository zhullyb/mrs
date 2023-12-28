# 影评系统（mrs）前端

## 项目介绍

这学期修了一门叫《用HTML5 和 PHP编写JavaScript，jQuery 和 AJAX脚本》的 web 课（对，听起来很奇怪的名字）。期末大作业是写一个影评系统，前端允许使用框架，后端仅允许使用 php，具体的作业要求如下

> 1、制作一个电影评价系统（参考豆瓣电影），要求包含电影查找，电影介绍、评分和评论展示，用户注册、登陆、评论、评分等功能。用户分管理员用户和普通注册用户。管理员可对普通用户、电影介绍和评论进行管理（增删改查）。普通用户可以查看电影介绍，对电影评论、评分，管理自己的评论和评分等。其他功能可自由发挥，尽量提高用户体验。
>
> 2、要求界面美观，交互性强：至少有三处以上利用 js 实现的动态效果，必须应用到 ajax；服务器端脚本用 php。
>
> 3、~~三个人一组，实验报告要写清楚每个人的分工和工作量占比。~~（争取到了自己一个人写的机会）
>
> 4、系统演示与答辩。介绍系统功能、特点、实现方法、用到的主要技术等。
>
> 5、上交一份电子稿材料包括技术报告、完整的源代码、以及 sql 数据库备份文件。

## 后端

后端使用 php + mysql，代码开源在 [zhullyb/mrs-php](https://github.com/zhullyb/mrs-php)

## 项目结构

- `src`：主要代码
    - `apis`：封装的 api，与后端交互
    - `components`：封装的组件
    - `pages`：呈现给用户的页面
    - `router`：路由
    - `store`：pinia 全局储存
    - `types`：类型定义
    - `App.vue`：根组件

## 开发

将 .env.example 复制为 .env，填入后端开发服务器的地址。

```bash
pnpm install
pnpm dev
```

## 部署

将 .env.example 复制为 .env，填入后端服务器的地址。

```bash
pnpm install
pnpm build
```

部署到服务器时，需要将 `/api` 和 uploads 的请求反向代理到后端服务器。

## 技术栈

- [Vue 3](https://v3.vuejs.org/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vue Router](https://router.vuejs.org/)
- [Axios](https://axios-http.com/)
- [Ant Design Vue](https://antdv.com/)
- [dayjs](https://day.js.org/)

***

本项目使用 [GLWTPL](./LICENSE) 协议开源，祝你好运。