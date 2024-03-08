import React, { useContext, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDataFetching } from "@/firebase/service";
import JobsGroup from "./jobsGroup";
import { JobsContext } from "@/context/AppProvider";

// eslint-disable-next-line react/prop-types

function JobItems() {
 const {jobItem} = useContext(JobsContext)
 console.log(jobItem);

    

  return (
    <div>
      <div className="w-90% m-[8px] bg-white px-[4px] py-[8px] flex items-center justify-between">
        {jobItem && jobItem.map((job)=>(
            <div>
                <h2>{job.title}</h2>
                <FontAwesomeIcon icon={faTrash} />
            </div>
        ))}
      </div>
    </div>
  );
}

export default JobItems;
