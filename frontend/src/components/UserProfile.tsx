import { useWallet } from '../hooks/useWallet';

interface UserProfileProps {
  address: string;
}

export const UserProfile = ({ address }: UserProfileProps) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h3 className="text-xl font-bold mb-4">用户资料</h3>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">钱包地址:</p>
          <p className="font-mono text-xs break-all">{address}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">账户余额:</p>
          <p className="text-2xl font-bold">-- ETH</p>
        </div>
      </div>
    </div>
  );
};
