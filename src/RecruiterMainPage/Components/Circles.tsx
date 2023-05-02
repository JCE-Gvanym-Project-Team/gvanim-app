import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/database";

const config = {
  // Your Firebase config here
};

firebase.initializeApp(config);

const db = firebase.database();

const CircleGroup: React.FC = () => {
  const [jobsOnSite, setJobsOnSite] = useState<number>(0);
  const [unreadResumes, setUnreadResumes] = useState<number>(0);

  useEffect(() => {
    const jobsRef = db.ref("jobs");
    jobsRef.on("value", (snapshot) => {
      const jobsCount = snapshot.numChildren();
      setJobsOnSite(jobsCount);
    });

    const resumesRef = db.ref("resumes");
    resumesRef
      .orderByChild("read")
      .equalTo(false)
      .on("value", (snapshot) => {
        const unreadResumesCount = snapshot.numChildren();
        setUnreadResumes(unreadResumesCount);
      });
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        width: "50%",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#ddd",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {jobsOnSite}
        </div>
        <div>Jobs on Site</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            backgroundColor: "#ddd",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          {unreadResumes}
        </div>
        <div>Unread Resumes</div>
      </div>
    </div>
  );
};

export default CircleGroup;
