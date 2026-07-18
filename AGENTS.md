# YM Printer 开发指南

## 项目概览

- **YM Printer** 是面向喷墨打印机的桌面打印应用，支持导入、预览和打印 `doc`、`docx`、`wps`、`pdf` 等文档，并提供页码范围、单双面、墨盒颜色和方向等打印配置。
- 技术栈：Electron 43、electron-vite 5、Vue 3、TypeScript、Pinia、Vue Router、Tailwind CSS v4。
- 包管理器为 pnpm；项目使用 Node.js `24.18.0`（见 `package.json` 的 `volta` 配置）。

## 开始前：优先使用 CodeGraph

仓库根目录包含 `.codegraph/`。在定位、理解或修改代码前，**优先使用 CodeGraph MCP 的 `codegraph_explore`** 查询相关符号、文件和调用链；仅在 CodeGraph 无法满足需求时，再使用 `rg`、目录遍历或直接阅读文件。

查询时优先提供具体的文件名、符号名或业务问题，以获取当前源码及跨进程调用关系。特别是排查 Electron 主进程、预加载脚本和渲染进程之间的通信时，先查看完整调用链再修改。

## 目录与进程职责

```text
src/
├── main/                 # Electron 主进程：窗口、IPC、文档与打印服务
│   ├── browser-windows/  # BrowserWindow 创建与管理
│   ├── ipc/              # IPC 主进程/渲染进程通道定义
│   ├── service/          # 文档、路径、Worker 等业务服务
│   └── utils/            # 主进程工具
├── preload/              # 受限的 Electron API 桥接与类型声明
├── renderer/             # Vue 渲染进程入口与自动导入类型
│   └── src/
│       ├── assets/ components/ hooks/ layout/ map/
│       ├── router/ services/ stores/ utils/ views/
│       └── App.vue main.ts
└── type/                 # 主进程、预加载与渲染进程共享的类型
```

- 主进程别名：`@` → `src/main`；渲染进程别名：`@` → `src/renderer/src`；共享类型：`@type` → `src/type/index`。
- 需要跨进程的能力应通过 `src/preload` 暴露，并在 `src/main/ipc` 处理；不要在渲染进程直接使用 Node.js 或 Electron 主进程 API。

## 自动导入与前端约定

`electron.vite.config.ts` 已通过 `unplugin-auto-import/vite` 自动导入以下 API：

- `vue`
- `pinia`
- `vue-router`

在渲染进程中使用这些库提供的 API 时，**不要额外手动写 import**。自动导入类型位于 `src/renderer/auto-imports.d.ts`，修改自动导入配置后应保留或更新该类型文件。

- 使用 Vue 3 与 TypeScript；Pinia 管理状态，Vue Router 管理路由。
- UI 使用 Element Plus 和 Tailwind CSS v4；修改样式时遵循项目现有写法。
- 修改跨进程接口时，同步更新预加载层、IPC 处理和共享类型，避免接口与类型不一致。

## 常用命令

```bash
pnpm dev               # 启动 Electron 开发环境
pnpm typecheck         # 检查主进程和渲染进程类型
pnpm build             # 类型检查后构建
pnpm build:unpack      # 构建未打包目录
pnpm build:win         # 构建 Windows 安装包
pnpm format            # 使用 Prettier 格式化
pnpm rebuild           # 重建 winax 原生依赖
pnpm release           # 执行发布脚本
```

## 修改与验证原则

- 保持改动最小且聚焦，不修改无关代码或生成目录（如 `dist/`、`out/`）。
- 涉及 TypeScript 或 Vue 代码时，至少运行与改动相关的类型检查；交付前优先执行 `pnpm typecheck`。
- 涉及打包、原生依赖或 Electron 行为时，根据影响范围执行对应构建或在开发环境验证。
- 遵循 `.prettierrc` 的格式化配置；提交前不要混入无关格式化改动。

