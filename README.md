# shadcn-admin-vue

基于 Vue 3 + TypeScript + shadcn-vue 的中后台管理系统模板。

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建工具**: Vite
- **UI 组件**: [shadcn-vue](https://www.shadcn-vue.com/) (基于 Radix Vue / Reka UI)
- **样式**: Tailwind CSS v4
- **状态管理**: Pinia
- **路由**: Vue Router
- **数据请求**: Axios + TanStack Vue Query
- **表单**: VeeValidate + Zod
- **图表**: ECharts + vue-echarts
- **图标**: Lucide Vue

## 功能模块

| 模块 | 说明 |
| --- | --- |
| Dashboard | 仪表盘，数据概览与图表展示 |
| Tasks | 任务管理 |
| Users | 用户管理 |
| Apps | 应用模块 |
| Chats | 聊天功能 |
| Settings | 系统设置（个人资料、外观、通知等） |
| Auth | 登录认证 |
| Help Center | 帮助中心 |
| Errors | 错误页面（404 等） |

## UI 组件

基于 shadcn-vue 封装了 30+ 常用组件：Alert、Avatar、Badge、Button、Calendar、Card、Dialog、Form、Input、Select、Table、Tabs、Tooltip 等。

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建产物
npm run preview
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 通用组件
│   └── ui/          # shadcn-vue UI 组件
├── composables/     # 组合式函数
├── features/        # 业务功能模块
│   ├── apps/
│   ├── auth/
│   ├── chats/
│   ├── dashboard/
│   ├── settings/
│   ├── tasks/
│   └── users/
├── lib/             # 工具库
├── router/          # 路由配置
├── stores/          # Pinia 状态管理
├── App.vue
└── main.ts
```

## 部署

项目使用 Cloudflare Workers + GitHub Actions 自动部署，push 到 `main` 分支即自动构建发布。

配置步骤详见 [wrangler.toml](wrangler.toml) 和 [.github/workflows/deploy.yml](.github/workflows/deploy.yml)。

### GitHub Secrets 配置

| Secret | 说明 | 获取方式 |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Cloudflare API 令牌 | [创建 Token](https://dash.cloudflare.com/profile/api-tokens)，选择 Edit Cloudflare Workers 模板 |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 账户 ID | Dashboard URL 中的账户 ID，或域名 Overview 页面右侧栏 |

## 致谢

- [shadcn-vue](https://www.shadcn-vue.com/) - UI 组件库
- [shadcn-admin](https://github.com/satnaing/shadcn-admin) - React 版本参考
