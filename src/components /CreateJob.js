
import { useWallet } from "../utils/utilities";
import { useState } from "react";
export default function CreateJob() {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [price, setPrice] = useState("");

  const { postJobs } = useWallet();
  const changeName = (event) => {
    setName(event.target.value);  
  };
  const changeTitle = (event) => {
    setTitle(event.target.value);
  };
  const changeDescription = (event) => {
    setDescription(event.target.value);
  };
  const changeDeadline = (event) => {
    setDeadline(event.target.value);
  };
  const changePrice = (event) => {
    setPrice(event.target.value);
  };

  return (
    <div>
      <div className=" grid justify-center mt-10  sm:mt-10 ">
        <div className="md:grid md:grid-cols-2 md:gap-4">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg text-2xl leading-6 text-white">
                Job Information
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Owner`s Name
                      </label>
                      <input
                        onChange={changeName}
                        type="text"
                        name="name"
                        id="name"
                        className="mt-3 block w-full bg-gray-300 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block text-sm  font-medium text-gray-700"
                      >
                        Title
                      </label>
                      <input
                        onChange={changeTitle}
                        type="text"
                        name="title"
                        id="title"
                        className="mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <input
                        onChange={changeDescription}
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="description"
                        className="mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                      <label
                        htmlFor="deadline"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Deadline
                      </label>
                      <input
                        onChange={changeDeadline}
                        type="text"
                        name="deadline"
                        id="deadline"
                        className="mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Price
                      </label>
                      <input
                        onChange={changePrice}
                        type="text"
                        name="price"
                        id="price"
                        className=" mt-3 bg-gray-300 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() =>
                      postJobs(name, title, description, deadline, price)
                    }
                  >
                    Add Job
                  </button>
                </div>
              </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}
