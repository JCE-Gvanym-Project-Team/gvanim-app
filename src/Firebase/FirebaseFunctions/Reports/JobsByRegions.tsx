import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import { Job, getFilteredJobs } from "../Job";

interface ChartComponentProps {
  regions: string[];
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

      const jobsByRegion: { [region: string]: number } = {};

      for (let i = 0; i < filteredJobs.length; i++) {
        const job = filteredJobs[i];
        const region = job._region;

        if(job._open === true){
        if (jobsByRegion[region]) {
          jobsByRegion[region]++;
        } else {
          jobsByRegion[region] = 1;
        }
    }
      }

      const regions = Object.keys(jobsByRegion);
      const quantities = Object.values(jobsByRegion);

      Highcharts.chart("chart-container", {
        chart: {
          type: "column",
          renderTo: "chart-container",
        },
        title: {
          text: "מספר משרות לפי ערים",
        },
        xAxis: {
          categories: regions,
          title: {
            text: "ערים",
          },
        },
        yAxis: {
          title: {
            text: "מספר משרות",
          },
        },
        series: [
          {
            type: "column",
            name: "מספר משרות",
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
