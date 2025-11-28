import { useState, useEffect } from 'react';
import { web3Service } from '../utils/web3';
import type { WalletState } from '../types';

// Sepolia 测试网链 ID
const SEPOLIA_CHAIN_ID = 11155111;
const SEPOLIA_CHAIN_HEX = '0xaa36a7';

export const useWallet = () => {
  const [walletState, setWalletState] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const switchToSepolia = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: SEPOLIA_CHAIN_HEX }],
      });
    } catch (switchError: any) {
      // 如果链不存在，添加它
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: SEPOLIA_CHAIN_HEX,
                chainName: 'Sepolia 测试网',
                nativeCurrency: {
                  name: 'Sepolia ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
        } catch (addError) {
          throw new Error('无法添加 Sepolia 测试网');
        }
      } else {
        throw switchError;
      }
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);
      setError(null);
      const address = await web3Service.connectWallet();
      const chainId = await web3Service.getChainId();

      // 检查是否在 Sepolia 测试网
      if (chainId !== SEPOLIA_CHAIN_ID) {
        const shouldSwitch = confirm(
          '请切换到 Sepolia 测试网。\n\n这是一个测试应用，只能在 Sepolia 测试网上使用。点击确定自动切换网络。'
        );

        if (shouldSwitch) {
          await switchToSepolia();
          // 重新获取链 ID
          const newChainId = await web3Service.getChainId();
          setWalletState({
            address,
            isConnected: true,
            chainId: newChainId,
          });
        } else {
          throw new Error('请切换到 Sepolia 测试网');
        }
      } else {
        setWalletState({
          address,
          isConnected: true,
          chainId,
        });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : '连接钱包失败';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWalletState({
      address: null,
      isConnected: false,
      chainId: null,
    });
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setWalletState(prev => ({
            ...prev,
            address: accounts[0],
          }));
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, []);

  return {
    ...walletState,
    connectWallet,
    disconnectWallet,
    loading,
    error,
  };
};
