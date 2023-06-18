import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import HighchartsExportData from "highcharts/modules/export-data";
import { Job, getFilteredJobs } from "../Job";

const JobsComponent: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load Highcharts libraries
    HighchartsExporting(Highcharts);
    HighchartsExportData(Highcharts);

    const fetchDataAndCreateChart = async () => {
      const filteredJobs = await getFilteredJobs();
      setJobs(filteredJobs); // Update the jobs state with filtered jobs
    };

    fetchDataAndCreateChart();
  }, []);

  useEffect(() => {
    const createChart = () => {
      const jobsByRegion: { [region: string]: number } = {};

      for (let i = 0; i < jobs.length; i++) {
        const job = jobs[i];
        const region = job._region;

        if (job._open === true) {
          if (jobsByRegion[region]) {
            jobsByRegion[region]++;
          } else {
            jobsByRegion[region] = 1;
          }
        }
      }

      const regions = Object.keys(jobsByRegion);
      const quantities = Object.values(jobsByRegion);

      Highcharts.chart("chart-container2", {
        chart: {
          type: "column",
          renderTo: "chart-container",
        },
        title: {
          text: "",
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
            color: "#6666ff", // כחול כהה
          },
        ],
      });
    };

    createChart();
  }, [jobs]);

  return (
    <>
      <style>{`
        #chart-container2 {
          width: 100%;
          height: 400px;
        }
      `}</style>
      <div className="chart-container">
        <div id="chart-container2"></div>
      </div>
    </>
  );
};

export default JobsComponent;
