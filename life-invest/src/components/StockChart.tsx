import React from 'react';
import {StockChartData} from '../../store/slices//types'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';

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

  return (
    <div>
        {data.length > 0 ? (
      <div>
        <ResponsiveContainer width="100%" height={300}>
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
         <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="price" 
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
  );
};

export default StockChart;