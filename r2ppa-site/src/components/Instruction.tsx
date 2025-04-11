import { Check, Copy } from "lucide-react";
import { useState } from "react";

const Instruction = () => {
  const keyText = `sudo wget -O - https://rishikesavanramesh.github.io/R2PPA/public.key | sudo gpg --dearmor -o /usr/share/keyrings/r2ppa-repo.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/r2ppa-repo.gpg] https://rishikesavanramesh.github.io/R2PPA/r2ppa/apt-repo stable main" > /etc/apt/sources.list.d/r2ppa-repo.list
sudo apt update`;

  const installText =     <>
  <span>sudo apt install -y ros-</span><span className="text-red-400">&lt;ros-distro&gt;</span><span className="text-blue-400">&lt;package-name&gt;</span>
</>;

  const [copied, setCopied] = useState(false);

  const copyToClipboard = (textToCopy: any) => {
    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1000);
      })
      .catch(err => console.error('Failed to copy: ', err));
  };

  return (
    <div className="bg-[#bababb]/40 w-full rounded-[20px] p-4">
      <div className="flex flex-col">
        <div className="flex flex-row items-start">
          <div className="flex-1">
            <div className="text-2xl underline">How to use this PPA?</div>
            Open your terminal. <br />
            Paste this command to add this PPA. <br />
          </div>

          <div className="relative bg-[#bababb]/40 bg-[#ffffff] rounded-[10px] w-[60%] md:w-[800px] ml-2 overflow-x-auto scrollbar-hidden p-2">
            <button
              onClick={() => copyToClipboard(keyText)}
              className={`flex flex-row items-center gap-2 absolute top-2 right-2 rounded-full p-1 shadow z-10 transition-colors duration-300 bg-white`}
              aria-label="Copy to clipboard"
            >
              {copied ? <Check size={16} color="green" /> : <Copy size={16} />}
            </button>
            <code className="block whitespace-pre select-text max-h-[300px] overflow-y-auto scrollbar-hidden">
              {keyText.split('\n').map((line, index) => (
                <div key={index} className="whitespace-nowrap">
                  {line}
                </div>
              ))}
            </code>
          </div>
        </div>

        <hr className="my-4 border-t border-gray-400" />

        <div className="flex flex-row items-center">
          <div className="flex-1">
            Run this command to install a package from this PPA.
          </div>

          <div className="relative bg-[#bababb]/40 bg-[#ffffff] rounded-[10px] w-[60%] md:w-[800px] ml-2 overflow-x-auto scrollbar-hidden p-2">
            <code className="block whitespace-pre select-text max-h-[300px] overflow-y-auto scrollbar-hidden">
                {installText}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instruction;
