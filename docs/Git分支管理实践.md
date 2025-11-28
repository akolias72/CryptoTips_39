# Git 分支管理实践文档

## 项目信息

- **项目名称**: Crypto Tips - Web3 加密货币打赏平台
- **仓库地址**: https://github.com/komikomiii/CryptoTips_39
- **文档目的**: 演示 Git 分支管理、合并分支、解决冲突等操作

---

## 一、分支管理概述

### 1.1 分支策略

本项目采用 **Feature Branch Workflow（特性分支工作流）**：

- `main` - 主分支，保存稳定的生产代码
- `feature/*` - 功能分支，用于开发新功能
- `bugfix/*` - 修复分支，用于修复 bug
- `docs/*` - 文档分支，用于文档更新

### 1.2 分支命名规范

- 功能分支: `feature/功能名称`
- 修复分支: `bugfix/问题描述`
- 文档分支: `docs/文档类型`

---

## 二、实践操作步骤

### 步骤 1: 查看当前分支状态

```bash
# 查看当前所在分支
git branch

# 查看所有分支（包括远程分支）
git branch -a

# 查看当前状态
git status
```

**预期输出**:
```
* main
```

---

### 步骤 2: 创建功能分支 - 用户资料功能

```bash
# 创建并切换到新分支
git checkout -b feature/user-profile

# 验证已切换到新分支
git branch
```

**预期输出**:
```
* feature/user-profile
  main
```

**说明**: 创建了一个名为 `feature/user-profile` 的分支，用于开发用户资料展示功能。

---

### 步骤 3: 在功能分支上开发并提交

#### 3.1 创建用户资料组件

```bash
# 创建新组件文件
cat > frontend/src/components/UserProfile.tsx << 'EOF'
import { useWallet } from '../hooks/useWallet';

interface UserProfileProps {
  address: string;
}

export const UserProfile = ({ address }: UserProfileProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">用户资料</h3>
      <div className="space-y-2">
        <p className="text-sm text-gray-600">钱包地址:</p>
        <p className="font-mono text-xs break-all">{address}</p>
      </div>
    </div>
  );
};
EOF
```

#### 3.2 提交更改

```bash
# 查看修改
git status

# 添加到暂存区
git add frontend/src/components/UserProfile.tsx

# 提交
git commit -m "feat: 添加用户资料组件

- 创建 UserProfile 组件
- 显示用户钱包地址
- 使用 Tailwind CSS 样式"

# 查看提交历史
git log --oneline
```

**预期输出**:
```
[feature/user-profile abc1234] feat: 添加用户资料组件
 1 file changed, 15 insertions(+)
 create mode 100644 frontend/src/components/UserProfile.tsx
```

---

### 步骤 4: 继续开发并提交更多功能

```bash
# 完善用户资料组件
cat >> frontend/src/components/UserProfile.tsx << 'EOF'

// 添加余额显示功能
export const UserBalance = ({ address }: { address: string }) => {
  return (
    <div className="mt-4">
      <p className="text-sm text-gray-600">账户余额:</p>
      <p className="text-2xl font-bold">-- ETH</p>
    </div>
  );
};
EOF

# 提交更改
git add frontend/src/components/UserProfile.tsx
git commit -m "feat: 添加用户余额显示组件"

# 查看提交历史
git log --oneline --graph
```

---

### 步骤 5: 创建第二个功能分支 - 统计功能

```bash
# 切换回主分支
git checkout main

# 创建并切换到统计功能分支
git checkout -b feature/statistics

# 验证分支
git branch
```

**预期输出**:
```
  feature/user-profile
* feature/statistics
  main
```

---

### 步骤 6: 在统计分支上开发

```bash
# 创建统计组件
cat > frontend/src/components/Statistics.tsx << 'EOF'
import { useState, useEffect } from 'react';

export const Statistics = () => {
  const [stats, setStats] = useState({
    totalTips: 0,
    totalAmount: '0',
    tipperCount: 0,
  });

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">打赏统计</h3>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">总打赏次数</p>
          <p className="text-2xl font-bold">{stats.totalTips}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">总金额</p>
          <p className="text-2xl font-bold">{stats.totalAmount} ETH</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">打赏人数</p>
          <p className="text-2xl font-bold">{stats.tipperCount}</p>
        </div>
      </div>
    </div>
  );
};
EOF

# 提交
git add frontend/src/components/Statistics.tsx
git commit -m "feat: 添加打赏统计组件

- 显示总打赏次数
- 显示总金额
- 显示打赏人数"
```

---

### 步骤 7: 模拟冲突场景

**说明**: 现在我们在两个分支上修改同一个文件，制造冲突场景。

#### 7.1 在 statistics 分支修改 README

```bash
# 确保在 statistics 分支
git checkout feature/statistics

# 在 README 末尾添加统计功能说明
cat >> README.md << 'EOF'

## 新功能

### 打赏统计
- 实时统计打赏数据
- 显示打赏人数和金额
- 数据可视化展示
EOF

# 提交
git add README.md
git commit -m "docs: 更新 README - 添加统计功能说明"
```

#### 7.2 在 user-profile 分支修改 README 的相同位置

```bash
# 切换到 user-profile 分支
git checkout feature/user-profile

# 在 README 末尾添加用户资料功能说明
cat >> README.md << 'EOF'

## 新功能

### 用户资料展示
- 显示用户钱包地址
- 显示账户余额
- 个性化用户信息
EOF

# 提交
git add README.md
git commit -m "docs: 更新 README - 添加用户资料功能说明"
```

---

### 步骤 8: 合并分支（无冲突）

```bash
# 切换回主分支
git checkout main

# 先合并 statistics 分支
git merge feature/statistics --no-ff -m "Merge branch 'feature/statistics' into main

合并统计功能到主分支:
- 添加打赏统计组件
- 显示实时统计数据"

# 查看合并结果
git log --oneline --graph -5
```

**预期输出**:
```
*   def5678 (HEAD -> main) Merge branch 'feature/statistics' into main
|\
| * ghi9012 (feature/statistics) docs: 更新 README - 添加统计功能说明
| * jkl3456 feat: 添加打赏统计组件
|/
* mno7890 Initial commit
```

---

### 步骤 9: 合并分支（产生冲突）

```bash
# 尝试合并 user-profile 分支
git merge feature/user-profile --no-ff
```

**预期输出（冲突提示）**:
```
Auto-merging README.md
CONFLICT (content): Merge conflict in README.md
Automatic merge failed; fix conflicts and then commit the result.
```

**说明**: 由于两个分支都修改了 README.md 的相同位置，产生了冲突。

---

### 步骤 10: 查看冲突

```bash
# 查看冲突状态
git status

# 查看冲突内容
cat README.md
```

**预期输出**:
```
On branch main
You have unmerged paths.
  (fix conflicts and run "git commit")
  (use "git merge --abort" to abort the merge)

Unmerged paths:
  (use "git add <file>..." to mark resolution)
        both modified:   README.md
```

**README.md 冲突内容示例**:
```markdown
<<<<<<< HEAD
## 新功能

### 打赏统计
- 实时统计打赏数据
- 显示打赏人数和金额
- 数据可视化展示
=======
## 新功能

### 用户资料展示
- 显示用户钱包地址
- 显示账户余额
- 个性化用户信息
>>>>>>> feature/user-profile
```

---

### 步骤 11: 解决冲突

#### 11.1 手动编辑文件解决冲突

```bash
# 打开编辑器解决冲突（或使用下面的命令）
# 将冲突标记删除，保留两个功能的说明

# 方法1: 使用编辑器
# nano README.md
# 或 vim README.md

# 方法2: 使用命令重写（推荐）
# 找到冲突部分，合并两个功能说明
```

**解决后的内容应该是**:
```markdown
## 新功能

### 打赏统计
- 实时统计打赏数据
- 显示打赏人数和金额
- 数据可视化展示

### 用户资料展示
- 显示用户钱包地址
- 显示账户余额
- 个性化用户信息
```

#### 11.2 标记冲突已解决

```bash
# 添加解决后的文件
git add README.md

# 查看状态
git status

# 完成合并提交
git commit -m "Merge branch 'feature/user-profile' into main

合并用户资料功能到主分支，并解决与统计功能的文档冲突:
- 添加用户资料组件
- 添加用户余额显示
- 解决 README 文档冲突，保留两个功能说明"
```

**预期输出**:
```
[main pqr4567] Merge branch 'feature/user-profile' into main
```

---

### 步骤 12: 查看分支合并历史

```bash
# 查看详细的分支合并图
git log --graph --oneline --all --decorate -10

# 查看特定文件的历史
git log --oneline -- README.md

# 查看合并提交的详细信息
git show HEAD
```

**预期输出（分支图）**:
```
*   pqr4567 (HEAD -> main) Merge branch 'feature/user-profile' into main
|\
| * stu8901 (feature/user-profile) docs: 更新 README - 添加用户资料功能说明
| * vwx2345 feat: 添加用户余额显示组件
| * yza6789 feat: 添加用户资料组件
* |   def5678 Merge branch 'feature/statistics' into main
|\ \
| |/
|/|
| * ghi9012 (feature/statistics) docs: 更新 README - 添加统计功能说明
| * jkl3456 feat: 添加打赏统计组件
|/
* mno7890 Initial commit
```

---

### 步骤 13: 清理已合并的分支

```bash
# 查看所有分支
git branch -a

# 删除已合并的功能分支
git branch -d feature/user-profile
git branch -d feature/statistics

# 验证分支已删除
git branch
```

**预期输出**:
```
Deleted branch feature/user-profile (was stu8901).
Deleted branch feature/statistics (was ghi9012).

* main
```

---

### 步骤 14: 推送到远程仓库

```bash
# 推送所有更改到远程
git push origin main

# 如果需要推送标签
git tag -a v1.1.0 -m "版本 1.1.0 - 添加用户资料和统计功能"
git push origin v1.1.0
```

---

## 三、分支管理最佳实践总结

### 3.1 分支创建

- ✅ 从 `main` 分支创建新的功能分支
- ✅ 使用清晰的命名规范
- ✅ 一个分支只做一件事

### 3.2 提交规范

- ✅ 使用语义化提交信息（feat, fix, docs, style, refactor, test, chore）
- ✅ 提交信息清晰描述改动内容
- ✅ 小步提交，便于回滚和审查

### 3.3 合并策略

- ✅ 使用 `--no-ff` 保留分支历史
- ✅ 合并前先拉取最新代码
- ✅ 遇到冲突及时解决

### 3.4 冲突解决

- ✅ 理解冲突标记的含义
- ✅ 仔细检查冲突内容
- ✅ 测试解决后的代码
- ✅ 清晰说明冲突解决过程

---

## 四、提交信息规范

### 4.1 提交类型

| 类型 | 说明 | 示例 |
|------|------|------|
| feat | 新功能 | `feat: 添加用户资料组件` |
| fix | 修复 bug | `fix: 修复钱包连接失败问题` |
| docs | 文档更新 | `docs: 更新 README` |
| style | 代码格式调整 | `style: 格式化代码` |
| refactor | 重构 | `refactor: 重构钱包服务` |
| test | 测试相关 | `test: 添加单元测试` |
| chore | 构建/工具相关 | `chore: 更新依赖` |

### 4.2 提交信息格式

```
<类型>: <简短描述>

<详细描述>（可选）

<相关 Issue>（可选）
```

---

## 五、实际操作记录

### 操作日期
2025-XX-XX

### 操作人员
[你的名字]

### 分支记录

| 分支名称 | 创建时间 | 合并时间 | 状态 | 说明 |
|---------|---------|---------|------|------|
| feature/user-profile | XX:XX | XX:XX | 已合并 | 用户资料功能 |
| feature/statistics | XX:XX | XX:XX | 已合并 | 统计功能 |

### 冲突解决记录

| 文件 | 冲突原因 | 解决方案 | 解决时间 |
|------|---------|---------|---------|
| README.md | 两个分支同时修改了新功能说明部分 | 保留两个功能的说明，合并内容 | XX:XX |

---

## 六、截图说明（建议添加）

建议在实际操作时，对以下关键步骤截图：

1. 分支列表展示 (`git branch -a`)
2. 提交历史图 (`git log --graph`)
3. 冲突状态显示 (`git status`)
4. 冲突内容展示 (编辑器中的冲突标记)
5. 冲突解决后的内容
6. 合并完成后的分支图

---

## 七、常见问题

### Q1: 如何撤销错误的合并？
```bash
# 如果还没有推送到远程
git reset --hard HEAD~1

# 如果已经推送
git revert -m 1 HEAD
```

### Q2: 如何查看某个文件的修改历史？
```bash
git log -p <文件路径>
```

### Q3: 如何暂存当前工作切换分支？
```bash
git stash
git checkout <其他分支>
# 工作完成后
git checkout <原分支>
git stash pop
```

---

## 八、参考资料

- [Git 官方文档](https://git-scm.com/doc)
- [Git 分支管理策略](https://nvie.com/posts/a-successful-git-branching-model/)
- [语义化版本](https://semver.org/lang/zh-CN/)

---

**文档版本**: v1.0
**最后更新**: 2025-01-XX
**维护人**: [你的名字]
