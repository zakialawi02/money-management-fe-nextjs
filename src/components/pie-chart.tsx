"use client";

import ReactECharts from "echarts-for-react";
import { useEffect, useState } from "react";
import { Transaction } from "@/types/auth.types";

type Props = {
  data: Transaction[];
  chartMode?: "type" | "category";
};

type ChartDataItem = {
  value: number;
  name: string;
  itemStyle?: {
    color?: string;
  };
};

const PieChart = ({ data = [], chartMode = "type" }: Props) => {
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    let result: ChartDataItem[] = [];

    if (chartMode === "type") {
      const merged = data.reduce<{ [key: string]: number }>((acc, item) => {
        acc[item.type] = (acc[item.type] || 0) + item.amount;
        return acc;
      }, {});

      result = Object.entries(merged).map(([type, amount]) => ({
        value: amount,
        name: type,
        itemStyle: {
          color: type === "income" ? "#008028" : "#ff5a5b",
        },
      }));
    } else {
      const merged = data.reduce<
        Record<string, { amount: number; color?: string }>
      >((acc, item) => {
        const name = item.category?.name ?? "Uncategorized";
        if (!acc[name]) {
          acc[name] = { amount: 0, color: item.category?.color };
        }
        acc[name].amount += item.amount;
        return acc;
      }, {});

      result = Object.entries(merged).map(([name, { amount, color }]) => ({
        value: amount,
        name,
        itemStyle: {
          color,
        },
      }));
    }

    setChartData(result);
  }, [data, chartMode]);

  const chartOption = {
    tooltip: {
      trigger: "item",
    },
    series: [
      {
        name: chartMode ? "Type" : "Category",
        type: "pie",
        radius: "50%",
        center: ["50%", "50%"],
        data: chartData,
        selectedMode: "single",
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return <ReactECharts option={chartOption} />;
};

export default PieChart;
