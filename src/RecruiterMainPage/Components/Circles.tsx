import React, { useState, useEffect } from "react";
import { dataref } from "../../Firebase/FirebaseConfig/firebase";

function Circles() {
  const [jobsCount, setJobsCount] = useState(0);
  const [unreadResumesCount, setUnreadResumesCount] = useState(0);

  useEffect(() => {
    // Fetch jobs count from Firebase and update state
    dataref.ref("jobs").on("value", (snapshot) => {
      setJobsCount(snapshot.numChildren());
    });

    // Fetch unread resumes count from Firebase and update state
    dataref
      .ref("resumes")
      .orderByChild("status")
      .equalTo("unread")
      .on("value", (snapshot) => {
        setUnreadResumesCount(snapshot.numChildren());
      });
  }, []);

  return (
    <div className="circle-group">
      <div className="circle">
        <p>{jobsCount}</p>
        <span> - משרות באתר</span>
      </div>
      <div className="circle">
        <p>{unreadResumesCount}</p>
        <span> - קו"ח חדשים</span>
      </div>
    </div>
  );
}

export default Circles;
