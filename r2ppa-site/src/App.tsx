import React from "react";
import { PackageSearch } from "lucide-react";
import Table from "./components/Table";
import Instruction from "./components/Instruction";

const App: React.FC = () => {
  return (
    <div className="select-none h-screen w-screen flex flex-col justify-center items-center overflow-scroll scrollbar-hidden">
      <div className="w-[80vw] h-full flex flex-col">

        <div className="text-[45px] h-[65px] uppercase mb-0">r2ppa</div> 


        <div className="flex flex-col gap-y-3 h-full mb-3 scrollbar-hidden">
          <Instruction />

          <div className="sticky top-0 z-10 flex flex-col flex-grow bg-[#bababb]/40 rounded-[20px] pb-4 max-h-[100vh]">
            <div className=" z-10 flex flex-row items-center justify-end p-2">
              <div className="mr-2 flex items-center gap-x-2">
              <div className="text-3xl uppercase ">r2ppa</div>
                <input
                  type="text"
                  placeholder="Search packages"
                  className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
                />
                <div>
                  <PackageSearch />
                </div>
              </div>
            </div>

            <div className="flex-grow overflow-y-scroll scrollbar-hidden">

              <Table />
         
            </div>   
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
