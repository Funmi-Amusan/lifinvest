import React from 'react';
import {StockChartData} from '../../store/slices//types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps, CartesianGrid } from 'recharts';

interface StockChartProps {
  data: StockChartData[];
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className=" bg-white p-2 shadow-2xl">
        <div className=' flex flex-row gap-2 items-center'>
<div className=' bg-[#00d678] h-2 w-2 rounded-full'></div>
        <p className="">{new Date(label).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
        </div>
        <p className="">Price: {payload[0].value}</p>
      </div>
    );
  }

  return null;
};
const StockChart: React.FC<StockChartProps> = ({ data }) => {

  const [keyValue, setKeyValue] = React.useState('close');

  const chartOptions = [
    { key: 'open', label: 'Open' },
    { key: 'low', label: 'Low' },
    { key: 'high', label: 'High' },
    { key: 'close', label: 'Close' }
  ];
  return (
    <div>
 <div className="flex justify-end rounded-lg mb-6 gap-2  px-4 py-2 bg-[#F4F5F9] w-fit">
        {chartOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setKeyValue(option.key)}
            className={`p-1  rounded-md transition-colors text-black text-sm font-semibold ${
              keyValue === option.key
                ? 'bg-green-500 text-white'
                : 'bg-[#F4F5F9] text-gray-700 hover:bg-gray-100'
            }`}
            type="button"
          >
            {option.label}
          </button>
        ))}
      </div>
    <div>
        {data.length > 0 ? (
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
              dataKey={'close'}
            />
            <CartesianGrid strokeDasharray="3 3" />
         <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey={keyValue} 
              stroke="#00d678" 
              dot={false}
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
        ):(
            <div className="no-chart-data">No Stock Chart Data Available</div>
        )
        }
    </div>
    </div>
  );
};

export default StockChart;