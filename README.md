# 自己写的一个 webpack4 demo
> 这个 demo 主要是用来开发日常的展示的静态页面，而不是开发 SPA，因此不会引入框架（vue，react）。
>
> 有时希望快速开发一些简单静态页面，但是需要同时配置 ts，sass 等环境，于是自己制作了这样一个模板。


## 已实现功能：

- 打包并分离公共内容
- 开发环境自动刷新
- 多页面静态
- sass 支持
- pug 支持
- babel 基础支持

## 更新

- 添加 editorconfig 文件
- 添加 license
- 去除 eslint 支持
- 添加 typescript 支持
- 添加 bulma 为默认 CSS 框架

## 安装：

克隆项目到本地后：

```bash
yarn install
```



开启开发环境：

```bash
yarn run dev
```



打包：

```bash
yarn run build
```



开启纯静态服务器（需要先打包）：

```bash
yarn run serve
```

> 用于开启本地服务器查看打包后文件，为此需要引入 http-server。可以在 package.json 中移除 http-server。



## 开发



### 创建页面

`src/pages` 目录下的每一个文件夹代表一个页面。文件夹的名称代表页面路由。

要新建一个页面，首先在 `src/pages` 下创建一个文件夹。然后创建入口文件 `index.ts` 与模板文件 `index.pug`。

然后在 `index.ts` 中引入 `app.ts`：

```javascript
require("../../app.ts")
```



>  根目录下的 `src/app.ts` 是公共的入口文件。它不会自己生成页面。默认配置它下引入了 `main.scss` 文件。

在 `src/template` 下创建了 layout 文件夹。你可以在其中书写模板并导入你的模板：

```pug
//- template.pug
html
	head
	body
		block content

//- index.pug
extends ../../template/layout/template.pug

block content
	.content content item
```

> `src/pages`　下默认　`index` 文件夹会成为页面首页，路由为 `\`。其他页面路由与文件夹名相同。



### 使用样式

默认使用 `sass` 进行开发。`sass` 的入口文件位于 `src/assets/sass/main.scss`。已经导入了 `normalize.css`。

`main.scss` 已经在 `src/app.js` 中注册。因此你只需在你的页面入口文件导入 `app.js`。这样你的所有 `sass` 内容都会导入。

你也可以创建页面私有样式。只需在对应 `pages` 目录下创建，并在页面入口文件导入即可。

默认使用 [bulma](https://bulma.io/documentation/) 作为 CSS 框架。

> 静态小项目样式不会非常复杂。所以一般不使用私有样式，而是在 `src/assets/sass` 下创建 `pages` 文件夹，交由 `main.scss` 托管。每一个 `pages` 文件夹下的 `sass` 对应一个页面。
>
> 这参考了 `sass` 的 “7+1” 模式。



### 使用 ts

对于公共的 `ts`，可以注册在　`app.ts`。这样入口文件都会导入它。

也可以在入口文件直接书写，或者创建并导入。



### 图片等资源

暴露 static 文件夹，此文件夹下内容将会被拷贝到根目录
