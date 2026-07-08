# SnowTab - Chrome 新标签页扩展

这是一个使用 Vue 3 + Vite 构建的谷歌浏览器新标签页扩展。

## 功能特点

- 🎨 自定义背景图片
- 🔍 搜索栏（支持自定义透明度）
- ✨ 简洁优雅的界面设计
- 🌐 支持 Google Fonts

## 开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 构建 Chrome 扩展
npm run build:crx
```

## 安装扩展

1. 运行 `npm run build:crx` 构建扩展
2. 打开 Chrome 浏览器，访问 `chrome://extensions/`
3. 右上角开启"开发者模式"
4. 点击"加载已解压的扩展程序"
5. 选择项目中的 `dist` 文件夹

## 使用说明

安装完成后，每次打开新标签页时都会显示此自定义页面。

- 点击右上角的设置按钮可以更改背景图片和搜索栏透明度
- 设置会自动保存到本地存储

## 技术栈

- Vue 3 (Composition API)
- Vite
- TypeScript
- CSS3

## 文件结构

```
snow-tab/
├── public/              # 静态资源
│   ├── Nekoha.png      # 图标
│   └── manifest.json   # Chrome 扩展清单
├── src/                # 源代码
│   ├── components/     # Vue 组件
│   │   ├── SearchBar.vue
│   │   └── SettingsPanel.vue
│   ├── styles/         # 样式文件
│   │   └── global.css
│   ├── App.vue         # 主组件
│   └── main.ts         # 入口文件
├── dist/               # 构建输出（扩展程序目录）
├── scripts/            # 构建脚本
│   └── copy-manifest.js
├── index.html          # HTML 模板
├── package.json        # 项目配置
└── vite.config.ts      # Vite 配置
```

## 许可证

MIT
