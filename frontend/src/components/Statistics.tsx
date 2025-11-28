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
