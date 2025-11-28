# Crypto Tips - Web3 加密货币打赏平台

<div align="center">

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-61dafb.svg)

一个基于 Web3 技术构建的去中心化打赏平台，让内容创作者能够从支持者那里接收加密货币打赏。

[功能特点](#项目特点) • [技术栈](#技术栈) • [快速开始](#快速开始) • [文档](#相关文档)

</div>

---

## 📸 项目预览

<div align="center">
  <img src="docs/assets/preview.png" alt="项目预览" width="800"/>
</div>

## 项目特点

- 🔐 **Web3 集成**: 通过 MetaMask 钱包进行安全交易
- ⚡ **便捷打赏**: 只需几次点击即可发送 ETH 打赏
- 🎨 **创作者主页**: 为每位创作者提供个性化打赏页面
- 📊 **打赏统计**: 实时统计打赏数据和可视化展示
- 👤 **用户资料**: 显示钱包地址和账户余额信息
- 📱 **响应式设计**: 完美适配桌面和移动设备
- 🧪 **测试网支持**: 基于 Sepolia 测试网，安全无风险

## 技术栈

### 前端
- **框架**: React 18 + TypeScript
- **构建工具**: Vite 6.0
- **样式**: Tailwind CSS 3.4
- **Web3**: ethers.js 6.13
- **路由**: React Router v6

### 后端
- **运行时**: Node.js 18+
- **框架**: Express + TypeScript
- **ORM**: Prisma 5.22
- **数据库**: SQLite
- **认证**: JWT

### 区块链
- **网络**: Ethereum Sepolia 测试网
- **钱包**: MetaMask 集成
- **库**: ethers.js

## 项目结构

```
Crypto-Tips/
├── frontend/                 # React 前端应用
│   ├── src/
│   │   ├── components/      # React 组件
│   │   │   ├── WalletButton.tsx    # 钱包连接按钮
│   │   │   ├── TipForm.tsx         # 打赏表单
│   │   │   ├── Statistics.tsx      # 打赏统计组件
│   │   │   └── UserProfile.tsx     # 用户资料组件
│   │   ├── hooks/           # 自定义 Hooks
│   │   │   └── useWallet.ts        # 钱包连接逻辑
│   │   ├── utils/           # 工具函数
│   │   │   └── web3.ts             # Web3 服务
│   │   ├── types/           # TypeScript 类型定义
│   │   └── App.tsx          # 主应用组件
│   ├── package.json
│   └── vite.config.ts
│
├── backend/                  # Node.js 后端 API
│   ├── src/
│   │   ├── routes/          # API 路由
│   │   ├── services/        # 业务逻辑
│   │   └── index.ts         # 入口文件
│   ├── prisma/
│   │   └── schema.prisma    # 数据库模型
│   └── package.json
│
├── docs/                     # 项目文档
│   ├── 五看三定分析.md       # 项目战略分析
│   ├── 开发指南.md           # 开发文档
│   ├── 部署指南.md           # 部署说明
│   ├── Git分支管理实践.md    # Git 操作指南
│   └── assets/              # 文档资源
│
├── LICENSE                   # MIT 许可证
└── README.md                 # 项目说明
```

## 快速开始

### 📋 环境要求

- **Node.js**: >= 18.0.0
- **npm**: >= 9.0.0
- **MetaMask**: 浏览器扩展（用于 Web3 交互）
- **Git**: 版本控制工具

### 🚀 安装步骤

#### 1️⃣ 克隆仓库

```bash
git clone https://github.com/komikomiii/CryptoTips_39.git
cd CryptoTips_39
```

#### 2️⃣ 安装前端依赖

```bash
cd frontend
npm install
```

#### 3️⃣ 安装后端依赖

```bash
cd ../backend
npm install
```

#### 4️⃣ 配置环境变量

在 `backend` 目录下创建 `.env` 文件：

```env
# 数据库配置
DATABASE_URL="file:./dev.db"

# JWT 密钥（请修改为您自己的密钥）
JWT_SECRET="your-secret-key-change-this"

# 服务器端口
PORT=3000

# CORS 来源（前端地址）
CORS_ORIGIN="http://localhost:5173"
```

#### 5️⃣ 初始化数据库

```bash
cd backend
npx prisma generate
npx prisma migrate dev
```

#### 6️⃣ 运行应用

**方式一：使用两个终端窗口**

```bash
# 终端 1 - 启动后端
cd backend
npm run dev

# 终端 2 - 启动前端
cd frontend
npm run dev
```

**方式二：使用并发运行（需先安装 concurrently）**

```bash
# 在项目根目录
npm install -g concurrently
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

#### 7️⃣ 访问应用

- **前端**: http://localhost:5173
- **后端 API**: http://localhost:3000

### 🦊 配置 MetaMask

1. 安装 [MetaMask 浏览器扩展](https://metamask.io/)
2. 创建或导入钱包
3. 切换到 **Sepolia 测试网**
4. 获取测试 ETH：访问 [Sepolia 水龙头](https://sepoliafaucet.com/)

## 📖 使用说明

### 👨‍💻 对于创作者

1. **连接钱包**
   - 点击右上角"连接钱包"按钮
   - 在 MetaMask 中确认连接
   - 确保已切换到 Sepolia 测试网

2. **设置个人资料**
   - 创建您的个人资料页面
   - 添加简介和头像
   - 设置接收打赏的钱包地址

3. **分享链接**
   - 复制您的专属打赏链接
   - 分享到社交媒体、博客等
   - 开始接收来自支持者的打赏

### 💰 对于支持者

1. **访问创作者页面**
   - 通过创作者分享的链接访问其打赏页面
   - 查看创作者的资料和打赏统计

2. **连接钱包**
   - 点击"连接钱包"按钮
   - 在 MetaMask 中授权连接
   - 确认网络为 Sepolia 测试网

3. **发送打赏**
   - 输入打赏金额（ETH）
   - 可选添加留言鼓励创作者
   - 点击"发送打赏"并在 MetaMask 中确认交易
   - 等待交易完成（约 15 秒）

## 🗺️ 开发路线图

### ✅ 已完成

- [x] 项目架构搭建（前端 + 后端）
- [x] MetaMask 钱包集成
- [x] Sepolia 测试网支持
- [x] 钱包连接状态管理
- [x] 自动网络检测和切换
- [x] 打赏统计组件
- [x] 用户资料展示组件
- [x] 响应式 UI 设计
- [x] Git 分支管理文档

### 🚧 开发中

- [ ] 用户认证系统（JWT）
- [ ] 创作者资料管理 API
- [ ] 打赏功能完整实现
- [ ] 交易历史记录查询

### 📅 计划中

- [ ] 二维码生成和分享
- [ ] 多种加密货币支持（USDT、USDC）
- [ ] 社交分享功能
- [ ] 数据分析仪表板
- [ ] 邮件通知系统
- [ ] 移动端优化

## 🤝 贡献指南

欢迎贡献代码！我们很高兴您有兴趣为项目做出贡献。

### 贡献流程

1. **Fork 本仓库**
   ```bash
   # 点击页面右上角的 Fork 按钮
   ```

2. **克隆您的 Fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/CryptoTips_39.git
   cd CryptoTips_39
   ```

3. **创建功能分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

4. **进行更改并提交**
   ```bash
   git add .
   git commit -m 'feat: 添加某个很棒的功能'
   ```

5. **推送到您的 Fork**
   ```bash
   git push origin feature/AmazingFeature
   ```

6. **创建 Pull Request**
   - 访问原仓库
   - 点击 "New Pull Request"
   - 选择您的分支并提交

### 提交规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 Bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建/工具相关

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- **项目链接**: [https://github.com/komikomiii/CryptoTips_39](https://github.com/komikomiii/CryptoTips_39)
- **问题反馈**: [Issues](https://github.com/komikomiii/CryptoTips_39/issues)
- **功能建议**: [Discussions](https://github.com/komikomiii/CryptoTips_39/discussions)

## 🙏 致谢

- 本项目作为 Web3 技术探索的课程项目开发
- 灵感来源于 [Ko-fi](https://ko-fi.com/) 和 [Buy Me a Coffee](https://www.buymeacoffee.com/) 等打赏平台
- 感谢以太坊和 Web3 社区提供的优秀工具和文档
- 特别感谢所有贡献者的支持

## 📚 相关文档

完整的项目文档位于 `docs/` 目录：

| 文档 | 描述 |
|------|------|
| [五看三定分析](docs/五看三定分析.md) | 项目战略分析和市场定位 |
| [开发指南](docs/开发指南.md) | 详细的开发文档和 API 说明 |
| [部署指南](docs/部署指南.md) | 生产环境部署步骤 |
| [Git分支管理实践](docs/Git分支管理实践.md) | Git 工作流和分支管理指南 |

## ✨ 新功能更新

### 📊 打赏统计功能
- ✅ 实时统计打赏数据
- ✅ 显示打赏人数和总金额
- ✅ 数据可视化展示
- 🚧 支持时间范围筛选（开发中）

### 👤 用户资料展示
- ✅ 显示用户钱包地址
- ✅ 显示账户余额信息
- ✅ 个性化用户信息展示
- 🚧 支持头像和简介设置（开发中）

## ❓ 常见问题

<details>
<summary><b>为什么要使用 Sepolia 测试网？</b></summary>

Sepolia 是以太坊官方推荐的测试网络，使用测试网可以：
- 免费获取测试 ETH（无真实价值）
- 安全测试智能合约和 DApp
- 避免在主网上产生真实费用

</details>

<details>
<summary><b>如何获取 Sepolia 测试 ETH？</b></summary>

您可以通过以下水龙头获取免费的 Sepolia ETH：
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Alchemy Sepolia Faucet](https://sepoliafaucet.com/)
- [Infura Sepolia Faucet](https://www.infura.io/faucet/sepolia)

</details>

<details>
<summary><b>项目支持哪些钱包？</b></summary>

目前主要支持 MetaMask 钱包。未来计划支持：
- WalletConnect（支持多种移动钱包）
- Coinbase Wallet
- Rainbow Wallet

</details>

<details>
<summary><b>可以在主网使用吗？</b></summary>

本项目目前仅用于学习和测试目的，建议只在测试网使用。如需部署到主网，请确保：
- 完整的安全审计
- 充分的测试覆盖
- 生产级别的错误处理
- 完善的监控和日志系统

</details>

---

<div align="center">

**⭐ 如果这个项目对您有帮助，请给我们一个 Star！**

Made with ❤️ by [komikomiii](https://github.com/komikomiii)

</div>
