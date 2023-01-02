import { useState } from "react";
import { useWallet } from "../utils/utilities";
export default function ApplyJob({index}) {
  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const { applyForJob } = useWallet();

  const changeName = (event) => {
    setName(event.target.value);
  };

  const changeEmail = (event) => {
    setEmail(event.target.value);

  };

  return (
    <div className="mt-20 grid gap-5 justify-center mt-5 sd:col-span-2 ">
      <div className=" px-4 sm:px-0">
        <h3 className="text-lg text-2xl leading-6 text-white">
          Applicant Information
        </h3>
      </div>
        <div className=" overflow-hidden shadow sm:rounded-md">
          <div className="overflow-hidden shadow  bg-white px-5 py-5 sm:p-20">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-3 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Applicant Name
                </label>{" "}
                <input
                  onChange={changeName}
                  type="text"
                  name="first-name"
                  id="first-name"
                  className="mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm "
                />
              </div>

              <div className="col-span-3 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  onChange={changeEmail}
                  type="email"
                  className="mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              className=" rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={() => applyForJob(name, email,index)}
            >
              Apply
            </button>
          </div>
        </div>
     
    </div>
  );
}
