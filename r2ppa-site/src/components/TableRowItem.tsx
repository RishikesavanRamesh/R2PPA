import React, { useState } from "react";
import { Info, Download, Check } from 'lucide-react';
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
  const [copied, setCopied] = useState(false); // State to track copy acknowledgment

  const copyToClipboard = () => {
    const textToCopy = `sudo apt install -y ros-${distro}-${packageName}`; // Create the text to copy
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000); // Reset copied state after 1 second
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <tr className={`tablerow flex flex-row flex-initial mb-1 items-center ${copied ? 'bg-[#ffffff]' : 'bg-[#ffffff] hover:bg-[#ebffed]'}`}>
      <td className={`flex-[4.5_4.5_0%] whitespace-nowrap flex items-center
        ${copied ? 'text-blue-700  overflow-visible scrollbar-hidden' : 'overflow-hidden'}
        `}>
        <div className={`px-2 mt-1`}>
          <Package size={16} />
        </div>
        <span className={copied ? 'text-blue-700' : ''}>
          {copied ? `Copied: sudo apt install -y ros-${distro}-${packageName}` : packageName}
        </span>
      </td>

      <td className="flex-1 flex justify-center">
        <span className={`text-xs bg-green-200 h-[100%] ${copied ? '' : 'p-1'}`}>
          {copied ? `` : version}
        </span>
      </td>

      <td className="flex-1 flex justify-center">
        <span 
          className={`text-xs border 
            ${copied ? '' : 'px-2'}
            rounded-[10px] 
            ${architecture === 'arm64' ? 'bg-purple-200 border-purple-800' : ''}
            ${architecture === 'amd64' ? 'bg-yellow-200 border-yellow-800' : ''}
          `}
        >
          {copied ? `` : architecture}
        </span>
      </td>

      <td className="flex-1 flex justify-center">
        <span 
          className={`text-xs border 
            ${copied ? '' : 'px-2'}
            rounded-[10px] uppercase 
            ${distro === 'humble' ? 'bg-blue-200 border-blue-800' : ''}
            ${distro === 'jazzy' ? 'bg-red-200 border-red-800' : ''}
          `}
        >
          {copied ? `` : distro}
        </span>
      </td>

      <td className="flex-[0.5_0.5_0%] flex flex-row">
        <div className={`flex-1 flex w-[20%] justify-center bg-gray-100 p-1 ${copied ? 'bg-green-500' : 'bg-blue-100'}`}>
          <button onClick={copyToClipboard} aria-label="Copy package info" className={`flex items-center justify-center rounded transition-all duration-300 focus:outline-none`}>
            {copied ? <Check size={16} color="white" /> : <Copy size={16} />}
          </button>
        </div>
        <div className="flex-1 flex justify-center bg-yellow-200 p-1">
          <a 
            href={infoLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Package information" 
            className="focus:outline-none focus:ring-2 focus:ring-yellow-800"
          >
            <Info size={16} />
          </a>
        </div>
        <div className="flex-1 flex justify-center bg-green-300 p-1">
          <a href={downloadLink} aria-label="Download package" className="focus:outline-none focus:ring-2 focus:ring-green-800">
            <Download size={16} />
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TableRowItem;
