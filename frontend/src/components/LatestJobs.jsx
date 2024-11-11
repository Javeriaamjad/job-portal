import React from "react";
import LatestJobsCard from "./LatestJobsCard";

const RANDOMJOB = [1, 2, 3, 4, 5, 6, 7, 8];

const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">
        <span className="text-purpleblue">Latest & Top</span>
        Job Openings
      </h1>
      {/* //multiple  job cards display hoge */}
      <div className="grid grid-cols-3 gap-4 my-5">
        
        {RANDOMJOB.slice(0,6).map((item, index) => (
          <LatestJobsCard />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
