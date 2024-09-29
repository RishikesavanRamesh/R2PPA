import React from "react";
import { Info, Download } from 'lucide-react';
import { Package } from 'lucide-react';
import { Copy } from 'lucide-react';
// Define the type for the props
interface TableRowItemProps {
  packageName: string;
  version: string;
  distro: string;
  architecture: string; // New prop for architecture
  infoLink: string;
  downloadLink: string;
}

const TableRowItem: React.FC<TableRowItemProps> = ({
  packageName,
  version,
  distro,
  architecture, // New prop
  infoLink,
  downloadLink,
}) => {
  return (
    <tr className="tablerow flex flex-row bg-[#ebffed] mb-1 items-center">
      <div className="px-2 mt-1"><Package size={16}/></div>
      <td className="flex-5 ">

        {packageName}
        </td>
      
      <td className="flex-1 flex justify-center">
        <span className="text-xs  bg-green-200 h-[100%] p-1 ">
          {version}
        </span>
      </td>

      <td className="flex-1 flex justify-center">
        <span className="text-xs bg-greden-300 border border-green-700 px-2 ">
          {architecture}
        </span>
      </td>

     <td className="flex-1 flex justify-center">
        <span className="text-xs bg-[#f9e5d1] border border-[#888077] px-2 rounded-[10px]">
          {distro}
        </span>
      </td>
      <td className="flex flex-row space-x-2">
      <div className="flex-1 flex w-[20%] justify-center bg-gray-100 p-1">
          <a href={downloadLink}>
            <Copy size={16} />
          </a>
        </div>
        <div className="flex-1 flex justify-center bg-yellow-200 p-1">
          <a href={infoLink}>
            <Info size={16} />
          </a>
        </div>
        <div className="flex-1 flex justify-center bg-green-300 p-1">
          <a href={downloadLink}>
            <Download size={16} />
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TableRowItem;
