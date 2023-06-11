import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import { Job, getFilteredJobs } from "../Job";

interface ChartComponentProps {
  roles: string[];
  quantities: number[];
}

const JobsComponent: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load Highcharts libraries
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);
  }, []);

  useEffect(() => {
    const fetchDataAndCreateChart = async () => {
      const filteredJobs = await getFilteredJobs();
      setJobs(filteredJobs); // Update the jobs state with filtered jobs

      const candidatesByRole: { [role: string]: number } = {};

      for (let i = 0; i < filteredJobs.length; i++) {
        const job = filteredJobs[i];
        const role = job._role;

        if (candidatesByRole[role]) {
          candidatesByRole[role]++;
        } else {
          candidatesByRole[role] = 1;
        }
      }

      const roles = Object.keys(candidatesByRole);
      const quantities = Object.values(candidatesByRole);

      Highcharts.chart("chart-container", {
        chart: {
          type: "column",
          renderTo: "chart-container",
        },
        title: {
          text: "מספר מועמדים לפי סוגי משרות",
        },
        xAxis: {
          categories: roles,
          title: {
            text: "סוגי משרות",
          },
        },
        yAxis: {
          title: {
            text: "מספר מועמדים",
          },
        },
        series: [
          {
            type: "column",
            name: "מספר מועמדים",
            data: quantities,
          },
        ],
      });
    };

    fetchDataAndCreateChart();
  }, []);

  return <div id="chart-container"></div>;
};

export default JobsComponent;
