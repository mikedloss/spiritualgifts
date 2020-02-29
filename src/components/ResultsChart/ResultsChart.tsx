import React from "react";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { sortBy } from "lodash";

import { SimpleResult } from "../../types";

interface ResultsChartProps {
  data: SimpleResult[];
}

const CustomizedAxisTick = props => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={1} textAnchor="end" transform="rotate(-90)">
        {payload.value}
      </text>
    </g>
  );
};

const ResultsChart: React.FC<ResultsChartProps> = ({ data }) => {
  let newData: SimpleResult[] = sortBy(data, ["title"]);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={newData} margin={{ right: 10, bottom: 100, left: 10 }}>
        <XAxis
          dataKey="title"
          tick={<CustomizedAxisTick />}
          interval={0}
          textAnchor="end"
        />
        <Tooltip />
        <Area type="monotone" dataKey="score" stroke="#8884d8" fill="#8884d8" />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default ResultsChart;
