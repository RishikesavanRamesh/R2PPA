import React from "react";
import Instruction from "./components/Instruction";
import PackageTable from "./components/PackageTable"

import { Boxes } from 'lucide-react';
import Footer from "./components/Footer";



const App: React.FC = () => {
  return (
    
    <div className="select-none h-screen w-screen flex flex-col justify-center items-center overflow-scroll scrollbar-hidden focus:outline-none focus:ring-2 focus:ring-gray-300">
      <div className="w-[80vw] h-full flex flex-col">
        

        <div className="flex flex-row items-center gap-2 p-1">
          <Boxes size={30}/>
        <div className="text-3xl  uppercase mb-1">r2ppa</div>
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
