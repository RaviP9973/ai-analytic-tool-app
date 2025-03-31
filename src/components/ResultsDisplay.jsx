import React from 'react';
import { useSelector } from 'react-redux';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Loader2, TrendingUp, TrendingDown, BarChart2 } from 'lucide-react';

export default function ResultsDisplay() {
  const { results, isLoading, error } = useSelector((state) => state.query);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <Loader2 className="animate-spin text-blue-500" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-white rounded-lg shadow-md">
        <BarChart2 className="text-gray-400 mb-4" size={48} />
        <p className="text-gray-500">Enter a query to see insights</p>
      </div>
    );
  }

  const data = results.labels.map((label, index) => ({
    name: label,
    value: results.data[index],
  }));

  const trend = results.data[results.data.length - 1] > results.data[0];
  const TrendIcon = trend ? TrendingUp : TrendingDown;
  const trendColor = trend ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">{results.title}</h2>
        <TrendIcon className={trendColor} size={24} />
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '0.375rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {results.insights && (
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">Key Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.insights.map((insight, index) => (
              <div
                key={index}
                className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}