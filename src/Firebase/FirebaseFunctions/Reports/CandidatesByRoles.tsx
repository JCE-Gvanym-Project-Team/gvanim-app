import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { getFilteredJobs } from "../Job";


const Chart = () => {
  const [data, setData] = useState<{ name: string; value: number; }[]>([]);
  const colors = ["orangered", "skyblue", "limegreen", "purple", "yellow", "teal"];
  const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);
  const [chartOuterRadius, setChartOuterRadius] = useState(window.innerWidth * 0.3);


  useEffect(() => {
    async function fetchData() {
      const filteredJobs = await getFilteredJobs();
      const candidatesByRole: { [role: string]: number } = {};

      for (let i = 0; i < filteredJobs.length; i++) {
        const job = filteredJobs[i];
        const role = job._role;
        const sum_cands =  (await job.getCandidatures()).length;
        if(sum_cands > 0){
        if (job != undefined && role != undefined) {
          if (candidatesByRole[role]) {
            candidatesByRole[role] += sum_cands;
          } else {
            candidatesByRole[role] = sum_cands;
            const newColor = randomColor();
            colors.push(newColor);
          }
        }
      }
      }

      const newData: { name: string; value: number; fill: string; }[] = Object.entries(candidatesByRole).map(([role, quantity], index) => ({
        name: role,
        value: quantity,
        fill: colors[index % colors.length],
      }));

      if (newData != undefined)
        setData(newData);
    }

    fetchData();
  }, []);

  for(let i = 0 ; i < data.length; i ++)
     if(data[i].value == 0)
        console.log(data[i].name)
        

  useEffect(() => {
    function handleResize() {
      setChartWidth(window.innerWidth * 0.8);
      setChartOuterRadius(window.innerWidth * 0.3);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  // פונקציה שמגרילה צבע רנדומלי
  const randomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <PieChart width={chartWidth} height={chartWidth}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={chartOuterRadius} 
          fill="fill"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
  
  
};

export default Chart  ;
