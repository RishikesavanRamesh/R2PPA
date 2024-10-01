import React from "react";
import Instruction from "./components/Instruction";
import PackageTable from "./components/PackageTable"

import { Boxes } from 'lucide-react';
import Footer from "./components/Footer";



const App: React.FC = () => {
  return (
    
    <div className="select-none h-screen w-screen flex flex-col justify-center items-center overflow-scroll scrollbar-hidden focus:outline-none focus:ring-2 focus:ring-gray-300">
      <div className="w-[80vw] h-full flex flex-col">
        

      <div className="flex flex-row items-end gap-2 p-1 justify-between">

        <div className="flex flex-row items-center gap-2">
  <Boxes size={30} />
  <div className="text-3xl uppercase">r2ppa</div> </div>
  <div className="text-red-500 ">
    This PPA is intended for my personal use, but if you're interested, proceed with caution!
  </div>
</div>
        <div className="flex flex-col gap-y-3 h-full scrollbar-hidden">
          <Instruction />

          <PackageTable/>


        <Footer/>
        </div>
      </div>
    </div>
  );
};

export default App;
