import React from "react";
import { useSelector } from 'react-redux';
import { Bar } from "@ant-design/plots";
import { Card } from 'antd';


const BarChart = () => {
    const Details = useSelector((state:any) => state.counter.enrolleddata);

      const totalCourses = Details.length;
  let totalProgress = 0;
  let remainingProgress = 0;
  
  Details.forEach((item:any) => {
    totalProgress += item.progress;
    remainingProgress += 100 - item.progress;
  });
  
  const barChartData = [
    { progress: "Completed", count: ((totalProgress / (totalCourses * 100)) * 100) },
    { progress: "Remaining", count: ((remainingProgress / (totalCourses * 100)) * 100)},
  ];

	const config = {
		data: barChartData,
		xField: "progress",
		yField: "count",
		height: 120,
		autoFit: true,
		barWidthRatio: 0.6,
	};

	return (
		<Card title="Course status" bordered={false} style={{ width: '100%' }}>
		<Bar {...config} />
		</Card>
	)
};

export default BarChart;

