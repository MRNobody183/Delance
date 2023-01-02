import "./App.css";
import { useState } from "react";
import { AllJobs } from "./components /AllJobs";
import SwitchButton from "./components /SwitchButton";
import CreateJob from "./components /CreateJob";
import NavBar from "./components /NavBar";

function App() {
  const [createJob, setCreateJob] = useState(false);
 

  return (
    <div className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-contain background ">
      <NavBar />
      <div className="main-display">
        <SwitchButton func={setCreateJob} job={createJob} />
      </div>
      <div>{createJob ? <CreateJob /> : <AllJobs />}</div>
    </div>
  );
}

export default App;
