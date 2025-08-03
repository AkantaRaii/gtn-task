"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
interface Props {
  data: [{ year: string | number; count: string | number }] | [];
}
const LineChartComponent = ({ data }: Props) => {
  const defaultData = [
    { year: 2007, count: 0 },
    { year: 2008, count: 0 },
    { year: 2009, count: 0 },
    { year: 2010, count: 0 },
  ];
  const safedata = data.length == 0 ? defaultData : data;
  return (
    <div className="w-full h-full">
      <h1 className="text-center text-lg font-bold">Leak Trends</h1>
      <ResponsiveContainer
        width="100%"
        height="100%"
        className="focus:outline-none"
      >
        <LineChart data={safedata}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis ticks={[1, 2, 3, 4]} domain={[1, 4]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#a855f7"
            strokeWidth={3  }
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
export default LineChartComponent;
