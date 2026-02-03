# AI宝网部署指南

这是一个关于主流AI工具介绍和AI热点新闻的网站，域名：itboaowang.com.cn

## 网站功能

1. **AI工具介绍**：展示主流AI工具，包括ChatGPT、Midjourney、GitHub Copilot等
2. **AI热点新闻**：每日更新的AI领域最新动态
3. **自动更新机制**：每天自动更新新闻内容
4. **响应式设计**：适配各种设备屏幕

## 文件结构

```
├── index.html          # 主页面文件
├── daily-update.js     # 每日更新脚本
└── README.md          # 本文件
```

## 免费托管方案

### 方案一：GitHub Pages（推荐）

#### 部署步骤：

1. **创建GitHub仓库**
   - 访问 https://github.com/new
   - 仓库名：`itboaowang`（或其他名称）
   - 选择公开仓库
   - 点击"Create repository"

2. **上传网站文件**
   ```bash
   # 克隆仓库
   git clone https://github.com/你的用户名/itboaowang.git
   cd itboaowang
   
   # 复制网站文件到仓库
   cp -r /path/to/website/* .
   
   # 提交并推送
   git add .
   git commit -m "Initial commit: AI工具新闻网站"
   git push origin main
   ```

3. **启用GitHub Pages**
   - 进入仓库设置（Settings）
   - 左侧菜单选择"Pages"
   - 在"Source"部分选择"Deploy from a branch"
   - 分支选择"main"，文件夹选择"/ (root)"
   - 点击"Save"

4. **访问网站**
   - 网站地址：https://你的用户名.github.io/itboaowang/
   - 等待几分钟后生效

### 方案二：Vercel（更快速）

#### 部署步骤：

1. **注册Vercel账号**
   - 访问 https://vercel.com
   - 使用GitHub账号登录

2. **导入GitHub仓库**
   - 点击"New Project"
   - 选择刚刚创建的GitHub仓库
   - 点击"Import"

3. **配置部署**
   - 项目名称：`itboaowang`
   - 框架预设：选择"Other"
   - 点击"Deploy"

4. **访问网站**
   - 部署完成后会获得一个vercel.app域名
   - 例如：https://itboaowang.vercel.app

### 方案三：Netlify

#### 部署步骤：

1. **注册Netlify账号**
   - 访问 https://netlify.com
   - 使用GitHub账号登录

2. **拖拽部署**
   - 将网站文件夹拖拽到Netlify部署区域
   - 或选择"Import from Git"连接GitHub仓库

3. **配置部署**
   - 站点名称：`itboaowang`
   - 点击"Deploy site"

4. **访问网站**
   - 获得一个netlify.app域名
   - 例如：https://itboaowang.netlify.app

## 自定义域名配置

如果您拥有域名itboaowang.com.cn，可以配置自定义域名：

### GitHub Pages配置：
1. 在仓库Settings > Pages中
2. 找到"Custom domain"部分
3. 输入`itboaowang.com.cn`
4. 按照提示配置DNS记录

### Vercel/Netlify配置：
1. 在项目设置中找到"Domains"
2. 添加自定义域名
3. 按照提示配置DNS

## 每日更新机制

网站内置了每日自动更新功能：

1. **自动更新**：每天凌晨2点自动检查并更新新闻内容
2. **本地存储**：使用localStorage缓存数据，减少重复加载
3. **手动更新**：可以通过控制台调用`window.dailyUpdater.manualUpdate()`

## 网站维护

### 更新内容：
1. 修改`index.html`中的静态内容
2. 更新`daily-update.js`中的新闻生成逻辑
3. 提交更改到GitHub仓库

### 添加更多AI工具：
在`index.html`的JavaScript部分，修改`aiTools`数组：
```javascript
const aiTools = [
    // 添加新的工具对象
    {
        id: 7,
        name: "新工具名称",
        icon: "fas fa-icon-class",
        description: "工具描述",
        category: "分类",
        tags: ["标签1", "标签2"],
        link: "https://工具官网.com"
    }
];
```

## 技术特点

1. **纯前端技术**：HTML、CSS、JavaScript
2. **响应式设计**：适配手机、平板、电脑
3. **无后端依赖**：所有功能在前端实现
4. **轻量级**：文件体积小，加载速度快

## 注意事项

1. 确保所有外部链接使用HTTPS
2. 定期更新AI工具信息
3. 检查新闻内容的时效性
4. 测试不同浏览器的兼容性

## 联系信息

如有问题或建议，请通过GitHub Issues提交反馈。

---
**最后更新：2026-02-03**
**网站状态：准备部署**