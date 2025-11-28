import { useState } from 'react';
import { WalletButton } from './components/WalletButton';
import { TipForm } from './components/TipForm';
import { useWallet } from './hooks/useWallet';

function App() {
  const { isConnected, chainId } = useWallet();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Sepolia 测试网链 ID
  const SEPOLIA_CHAIN_ID = 11155111;
  const isCorrectNetwork = chainId === SEPOLIA_CHAIN_ID;

  // 演示接收地址 - 替换为实际用户地址
  const demoRecipient = '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

  const handleTipSuccess = (txHash: string) => {
    setSuccessMessage(`打赏成功！交易哈希: ${txHash.slice(0, 10)}...${txHash.slice(-8)}`);
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 头部 */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-3xl">💎</span>
            <h1 className="text-2xl font-bold text-white">加密货币打赏</h1>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className={`px-3 py-1 rounded-lg text-sm ${isCorrectNetwork ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'}`}>
                {isCorrectNetwork ? '✓ Sepolia 测试网' : '⚠ 请切换到 Sepolia'}
              </div>
            )}
            <WalletButton />
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* 标题区 */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              支持你喜欢的创作者
            </h2>
            <p className="text-xl text-white/80">
              通过 Web3 技术，直接向你喜欢的创作者发送加密货币打赏
            </p>
          </div>

          {/* 成功消息 */}
          {successMessage && (
            <div className="mb-6 p-4 bg-green-500 text-white rounded-lg shadow-lg">
              {successMessage}
            </div>
          )}

          {/* 打赏表单或连接提示 */}
          {isConnected ? (
            <div>
              <div className="mb-6 p-4 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                <p className="text-white text-sm mb-1">打赏给：</p>
                <p className="text-white font-mono text-xs break-all">{demoRecipient}</p>
              </div>
              <TipForm
                recipientAddress={demoRecipient}
                onSuccess={handleTipSuccess}
              />
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-2xl">
              <div className="text-6xl mb-4">🔒</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                连接您的钱包
              </h3>
              <p className="text-gray-600 mb-6">
                连接 MetaMask 钱包开始发送打赏
              </p>
            </div>
          )}

          {/* 特点介绍 */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white font-bold mb-2">即时到账</h3>
              <p className="text-white/70 text-sm">
                打赏直接通过区块链发送，无需等待
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🔐</div>
              <h3 className="text-white font-bold mb-2">安全可靠</h3>
              <p className="text-white/70 text-sm">
                基于以太坊区块链技术，安全有保障
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20">
              <div className="text-4xl mb-3">🌍</div>
              <h3 className="text-white font-bold mb-2">全球通用</h3>
              <p className="text-white/70 text-sm">
                在世界任何地方都可以发送和接收打赏
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white/10 backdrop-blur-md border-t border-white/20 py-6">
        <div className="container mx-auto px-4 text-center text-white/60 text-sm">
          使用 React + TypeScript + ethers.js 构建 | Web3 课程项目
        </div>
      </footer>
    </div>
  );
}

export default App;
