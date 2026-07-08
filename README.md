# Snow Tab ❄️

一个简洁优雅的个人浏览器起始页，基于 Vue 3 + TypeScript + Vite 构建。

## ✨ 特性

- 🔍 **智能搜索栏** - 居中显示的搜索入口
- 🖼️ **自定义背景** - 支持设置个性化背景图片
- 🎨 **透明度调节** - 可调整搜索栏区域的透明度
- 💾 **本地存储** - 配置自动保存到 localStorage
- 📱 **响应式设计** - 适配各种屏幕尺寸
- ⚡ **快速加载** - 基于 Vite 的极速构建体验

## 🛠️ 技术栈

- **框架**: Vue 3.5+ (使用 `<script setup>` SFC)
- **语言**: TypeScript 6.0+
- **构建工具**: Vite 8.1+
- **样式**: CSS3 (带 backdrop-filter 毛玻璃效果)

## 📦 安装与运行

### 环境要求

- Node.js 18+
- npm 或 pnpm

### 开发步骤

```bash
# 克隆项目后，安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 🎯 使用说明

### 设置背景图片

1. 点击右上角的设置按钮 (⚙️)
2. 在设置面板中输入背景图片 URL
3. 图片将自动保存并在下次访问时加载

### 调整搜索栏透明度

1. 打开设置面板
2. 拖动透明度滑块
3. 实时预览效果并自动保存

## 📁 项目结构

```
snow-tab/
├── public/              # 静态资源
├── src/
│   ├── components/      # Vue 组件
│   │   ├── SearchBar.vue    # 搜索栏组件
│   │   └── SettingsPanel.vue # 设置面板组件
│   ├── styles/          # 全局样式
│   ├── App.vue          # 主应用组件
│   ├── main.ts          # 应用入口
│   └── env.d.ts         # TypeScript 环境声明
├── index.html           # HTML 模板
├── package.json         # 项目配置
├── tsconfig.json        # TypeScript 配置
└── vite.config.ts       # Vite 配置
```

## 🔧 配置说明

项目使用以下 localStorage 键存储用户配置：

- `homepage_background` - 背景图片 URL
- `homepage_search_opacity` - 搜索栏透明度 (0-1)

## 📝 开发命令

| 命令 | 描述 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本 |
| `npm run preview` | 预览生产构建 |

## 📄 许可证

MIT License
