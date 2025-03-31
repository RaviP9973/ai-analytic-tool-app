import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { useSelector } from 'react-redux';

export default function QueryHistory() {
  const { queryHistory } = useSelector((state) => state.query);

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center gap-2 mb-4">
        <History size={20} className="text-gray-500" />
        <h2 className="text-lg font-semibold">Query History</h2>
      </div>
      <div className="space-y-2">
        {queryHistory.map((query, index) => (
          <div key={index} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded">
            <ArrowRight size={16} className="text-gray-400" />
            <span className="text-gray-700">{query}</span>
          </div>
        ))}
        {queryHistory.length === 0 && (
          <p className="text-gray-500 text-center py-4">No queries yet</p>
        )}
      </div>
    </div>
  );
}