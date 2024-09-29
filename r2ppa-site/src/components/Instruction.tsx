
const Instruction = () => {
  return (
    <div className="bg-[#bababb]/40 w-full rounded-[20px] p-4">
    {" "}
    {/* Added padding for better spacing */}
    <div className="flex flex-col">
      {" "}
      {/* Changed to flex-col for better stacking */}
      <div className="flex flex-row items-start">
        <div className="flex-1">
          {" "}
          {/* Allows the text to grow and take remaining space */}
          <div className="text-2xl underline">How to use this PPA?</div>
          Open your terminal. <br />
          Paste this command to add this PPA. <br />
        </div>
        <div className="bg-[#bababb]/40 rounded-[10px] w-[60%] md:w-[800px] ml-2 overflow-x-auto scrollbar-hidden p-2 ">
          <code className="block whitespace-nowrap select-text">
            sudo wget -O -
            https://rishikesavanramesh.github.io/IDENTITY/gpg.key | sudo
            apt-key add - <br />
            echo "deb [arch=amd64 signed-by=/example.pgp]
            https://rishikesavanramesh.github.io/R2PPA/r2ppa/apt-repo
            stable main" | sudo tee /etc/apt/sources.list.d/example.list
            <br />
            sudo apt update
          </code>
        </div>
      </div>
      <hr className="my-4 border-t border-gray-400" />
      {/* Horizontal line with margin and border color */}
      <div className="flex flex-row items-center">
        <div className="flex-1">
          Run this command to install a package from this PPA.
        </div>
        <div className=" select-text bg-[#bababb]/40 rounded-[10px] w-[60%] md:w-[800px] ml-2 p-2">
          {" "}
          {/* 70% width with a max width */}
          <code>
            sudo apt install -y ros-
            <span className="text-red-400">&lt;ros-distro&gt;</span>-
            <span className="text-blue-800">&lt;package-name&gt;</span>
          </code>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Instruction