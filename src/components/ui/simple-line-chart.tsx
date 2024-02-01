import { convertTimestampToTime } from "@/lib/utils";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

interface LineChartProps {
  data: {
    time: string;
    value: string;
  }[];
}

export function SimpleLineChart(props: LineChartProps) {
  const { data } = props;

  return (
    <ResponsiveContainer width='100%' height='100%' maxHeight={400} aspect={3}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray='4 4' />
        <XAxis dataKey='time' tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Line
          type='monotone'
          dataKey='value'
          stroke='#8884d8'
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Used type 'any' as escape hatch for unknown props given from the XAxis component
function CustomizedAxisTick(props: any) {
  const { x, y, payload } = props;

  const time = payload.value
    ? convertTimestampToTime(payload.value)
    : undefined;

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor='middle' fill='#666'>
        {time ?? ""}
      </text>
    </g>
  );
}
