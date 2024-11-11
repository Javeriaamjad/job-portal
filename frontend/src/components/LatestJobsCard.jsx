import React from "react";
import { Badge } from "./ui/badge";

const LatestJobsCard = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1>Company Name</h1>
        <p>Pakistan</p>
      </div>
      <div>
        <h1>Job Title</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
          quibusdam commodi dolorem. Ea sed repudiandae quisquam eos blanditiis.
          Fugiat deleniti totam reiciendis quia molestiae, nulla sit
          necessitatibus ad consectetur dolor.
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={'text-blue-700 font-bold'} variant='ghost'>
            12 Position
        </Badge>
        <Badge className={'text-reddish font-bold'} variant='ghost'>
            12 Position
        </Badge>
        <Badge className={'text-purple font-bold'} variant='ghost'>
            12 Position
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobsCard;
