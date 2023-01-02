import { useWallet } from "../utils/utilities";
import { useEffect, useState } from "react";

import ApplyJob from "./ApplyJob";
export function AllJobs() {
  const {checkSignature}=useWallet();
  const { allJobs } = useWallet();
  const [Apply, setApply] = useState(false);
  const [index, setIndex] = useState(0);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    getJobs();
  }, []);
  async function getJobs() {
    let data = await allJobs();
    if (data.length > 0) {
      setJobs(data);
    }
  }

  function apply(jobIndex) {
    if (index === jobIndex) {
      setApply(false);
      setIndex(0);
    } else {
      setIndex(jobIndex);
      setApply(true);
    }
  }

  return (
    <div className="mt-5 ml-20 flex flex-col">
     <div>
        <button onClick={()=>checkSignature('0xa19e0CBf86D7692b04AEf0CE439d12F8603FeDaC','0x0000000000000000000000000000000000000000')}>check signatureHash</button>
      </div>
      <div className="all-jobs">
        <div className="flex flex-row gap-x-3">
          {jobs.map((job, jobindex) =>
            job.ownerName !== "" ? (
              <div
                key={jobindex}
                className=" max-w-sm px-10 py-7 bg-white grid border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700"
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {job.title}
                </h5>

                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {job.description}
                </p>
                <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Deadline: {job.deadline}
                </label>
                <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Price: {job.price}
                </label>
                <label className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Posted By: {job.ownerName}
                </label>
                <button
                  className="items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  key={index}
                  onClick={() => apply(jobindex)}
                >
                  Apply
                </button>
              </div>
            ) : (
              ""
            )
          )}
        </div>
        <div className="flex justify-start">
          {Apply ? <ApplyJob index /> : " "}
        </div>
      </div>
    </div>
  );
}
