import React, { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip } from "recharts";
import { getFilteredJobs } from "../Job";

// import React, { useEffect, useState } from "react";
// import { Job, getFilteredJobs } from "../Job";
// import chart from 'chart.js/auto';

// interface ChartComponentProps {
//   roles: string[];
//   quantities: number[];
// }

// const JobsComponent: React.FC = () => {
//   const [jobs, setJobs] = useState<Job[]>([]);

//   useEffect(() => {
//     const fetchDataAndCreateChart = async () => {
//       const filteredJobs = await getFilteredJobs();
//       setJobs(filteredJobs);

//       const candidatesByRole: { [role: string]: number } = {};

//       for (let i = 0; i < filteredJobs.length; i++) {
//         const job = filteredJobs[i];
//         const role = job._role;

//         if (candidatesByRole[role]) {
//           candidatesByRole[role] =  candidatesByRole[role] + (await job.getCandidates()).length;
//         } else {
//           candidatesByRole[role] = 1;
//         }
//       }

//       const roles = Object.keys(candidatesByRole);
//       const quantities = Object.values(candidatesByRole);

//       new chart.Chart("chart-container3", {
//         type: "pie",
//         data: {
//           labels: roles,
//           datasets: [{
//             data: quantities,
//             backgroundColor: [
//               '#FF6384',
//               '#36A2EB',
//               '#FFCE56',
//               '#4BC0C0',
//               '#E7E9ED',
//               '#3cba9f',
//               '#e8c3b9',
//               '#c45850',
//               '#8e5ea2'
//             ]
//           }]
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: false,
//           plugins: {
//             legend: {
//               display: true,
//               position: "top",
//               align: "center"
//             }
//           },
//           tooltips: {
//             callbacks: {
//               label: (tooltipItem: any, data: any) => {
//                 const dataset = data.datasets[tooltipItem.datasetIndex];
//                 const value = dataset.data[tooltipItem.index];
//                 const label = data.labels[tooltipItem.index];
//                 return `${label}: ${value}`;
//               }
//             }
//           }
//         }
//       });
//     };

//     fetchDataAndCreateChart();
//   }, []);

//   return <div id="chart-container3"></div>;
// };

//export default JobsComponent;











// import React, { useEffect, useState } from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
// import { Pie } from 'react-chartjs-2';
// import { getFilteredJobs } from '../Job';
// import ReactDOM from "react-dom/client";

// ChartJS.register(ArcElement, Tooltip, Legend);


// export default async function CandidateByRoles() {

//   const [jobs, setJobs] = useState();
//   let filteredJobs;

//   useEffect(() => {
//     filteredJobs = await getFilteredJobs();
//     setJobs(filteredJobs);
//   }, [jobs]);

//   const candidatesByRole: { [role: string]: number } = {};

//   for (let i = 0; i < filteredJobs.length; i++) {
//     const job = filteredJobs[i];
//     const role = job._role;

//     if (candidatesByRole[role]) {
//       candidatesByRole[role] = candidatesByRole[role] + (await job.getCandidates()).length;
//     } else {
//       candidatesByRole[role] = 1;
//     }
//   }

//   const roles = Object.keys(candidatesByRole);
//   const quantities = Object.values(candidatesByRole);

//   console.log(quantities);
//   console.log(roles);


//   const data = {
//     labels: roles,
//     type: 'pie',
//     datasets: [
//       {
//         label: '# of Votes',
//         data: quantities,
//         backgroundColor: [
//           'rgba(255, 99, 132, 0.2)',
//           'rgba(54, 162, 235, 0.2)',
//           'rgba(255, 206, 86, 0.2)',
//           'rgba(75, 192, 192, 0.2)',
//           'rgba(153, 102, 255, 0.2)',
//           'rgba(255, 159, 64, 0.2)',
//         ],
//         borderColor: [
//           'rgba(255, 99, 132, 1)',
//           'rgba(54, 162, 235, 1)',
//           'rgba(255, 206, 86, 1)',
//           'rgba(75, 192, 192, 1)',
//           'rgba(153, 102, 255, 1)',
//           'rgba(255, 159, 64, 1)',
//         ],
//         borderWidth: 3,
//       },
//     ],
//   };

//   return (<Pie data={data} />);
// }

// export const data = {
//   labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//   datasets: [
//     {
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)',
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)',
//       ],
//       borderWidth:3 ,
//     },
//   ],
// };

// const root =  ReactDOM.createRoot(document.getElementById('root'));
// root.render(<CandidateByRoles/>)


// import React from "react";
// import { PieChart, Pie, Tooltip } from "recharts";
// 
// const myData = [
// { name: "Group A", value: 900, fill: "orangered" },
// { name: "Group B", value: 400, fill: "skyblue" },
// { name: "Group C", value: 300, fill: "limegreen" },
// ];
// 
// const App = () => {
// return (
// <PieChart width={800} height={800}>
{/* <Pie */ }
// dataKey="value"
// isAnimationActive={true}
// data={myData}
// outerRadius={300}
// fill="fill" // השתמש בשם התכונה fill בתוך גרשיים מקוטעות כדי להשתמש בערכים הייחודיים של התכונה fill בכל איבר במערך
// label
// />
{/*  */ }
//   Display the tooltips
{/* <Tooltip /> */ }
{/* </PieChart> */ }
// );
// };
// 
// export default App;


const A = () => {
  const [data, setData] = useState<{ name: string; value: number; }[]>([]);
  const colors = ["orangered", "skyblue", "limegreen", "purple", "yellow", "teal"];
  ;

  useEffect(() => {
    async function fetchData() {
      const filteredJobs = await getFilteredJobs();
      const candidatesByRole: { [role: string]: number } = {};

      for (let i = 0; i < filteredJobs.length; i++) {
        const job = filteredJobs[i];
        const role = job._role;

        if (job != undefined && role != undefined) {
          if (candidatesByRole[role]) {
            const cands =  (await job.getCandidatures()).length;
            candidatesByRole[role] += cands;
          } else {
            candidatesByRole[role] = 1;
            const newColor = randomColor();
            colors.push(newColor);
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
      <PieChart width={600} height={600}>
        <Pie
          dataKey="value"
          isAnimationActive={true}
          data={data}
          outerRadius={250}
          fill="fill"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
  
  
};

export default A;
