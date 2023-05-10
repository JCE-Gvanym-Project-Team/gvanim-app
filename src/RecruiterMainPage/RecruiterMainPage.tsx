import { useState, useEffect } from "react";
import { dataref } from "../Firebase/FirebaseConfig/firebase";
import Circles from "./Components/CirclesRecruiterMainPage";

// This component is the main page for the recruiter
function RecruiterMainPage() {
  const [jobsCount, setJobsCount] = useState(0); // State for jobs count
  const [unreadResumesCount, setUnreadResumesCount] = useState(0); // State for unread resumes count

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
    <div className="RecruiterMainPage">
      <Circles jobsCount={jobsCount} unreadResumesCount={unreadResumesCount} />
    </div>
  );
}

export default RecruiterMainPage;
