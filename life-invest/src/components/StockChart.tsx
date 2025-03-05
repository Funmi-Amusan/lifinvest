import React from 'react';
import {StockChartData} from '../../store/slices//types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StockChartProps {
  data: StockChartData[];
  symbol: string;
}



const StockChart: React.FC<StockChartProps> = ({ data, symbol }) => {
  if (!data.length) {
    return <div className="no-chart-data">No chart data available</div>;
  }


  console.log("data===========", data);

  return (
    <div>
      <h3>{symbol} Price History</h3>
      <div>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => {
                const date = new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                return `${date}`;
              }}
            />
            <YAxis 
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              dataKey={'price'}
            />
            <Tooltip  />
            <Line 
              type="natural" 
              dataKey="price" 
              stroke="#4285F4" 
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockChart;