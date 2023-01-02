import { useContext } from "react";
import { AccountContext } from "../context/accountContext";
import { useWallet } from "../utils/utilities";

export default function NavBar() {
  const { connectWallet } = useWallet();
  const { account } = useContext(AccountContext);
  return (
    <nav className="p-5 border-gray-400 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className=" flex flex-wrap items-center justify-between mx-auto">
        <a href="#" className="flex items-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/4783/4783316.png"
            className="h-6 mr-3 sm:h-10"
            alt="Flowbite Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Delance
          </span>
        </a>
        <button
          data-collapse-toggle="navbar-hamburger"
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded="false"
        ></button>
        <button
          type="button"
          onClick={connectWallet}
          className="flex rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          {account ? account : "ConnectWallet"}
        </button>
      </div>
    </nav>
  );
}
