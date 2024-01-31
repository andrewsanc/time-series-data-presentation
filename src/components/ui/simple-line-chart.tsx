import { convertTimestampToTime } from "@/lib/utils";
import {
  LineChart,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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
    <ResponsiveContainer width='100%' height='100%' aspect={3}>
      <LineChart width={500} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='time' tick={<CustomizedAxisTick />} />
        <YAxis />
        <Tooltip />
        <Legend />
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

function CustomizedAxisTick(props: any) {
  const { x, y, payload } = props;

  const time = payload.value
    ? convertTimestampToTime(payload.value)
    : undefined;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={16}
        textAnchor='end'
        fill='#666'
        transform='rotate(-35)'
      >
        {time ?? ""}
      </text>
    </g>
  );
}
