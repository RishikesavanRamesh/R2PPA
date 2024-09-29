import TableRowItem from "./TableRowItem"; // Adjust the import path as necessary

const Table = () => {
  const packages = [
    {
      packageName: "swerve-bot-description",
      version: "v0.0.1",
      distro: "humble",
      infoLink: "https://github.com/rishikesavanramesh/SWERVE-DRIVE",
      architecture: "amd64",
      downloadLink: "./../.././r2ppa/apt-repo/pool/main/binary-amd64/ros-humble-swervebot-description_0.0.0-0jammy_amd64.deb",
    },
    {
      packageName: "swerve-bot-core",
      version: "v0.0.1",
      distro: "humble",
      infoLink: "https://github.com/rishikesavanramesh/SWERVE-DRIVE",
      architecture: "amd64",
      downloadLink: "./../.././r2ppa/apt-repo/pool/main/binary-amd64/ros-humble-swerve-drive-core_1.0.0-0jammy_amd64.deb",
    },
    // Add more package objects as needed
  ];

  return (
    <div className="flex flex-col h-full">
      <thead className="absolute sticky top-0 bg-gray-600">
        <tr className="flex flex-row bg-gray-300">
          <th className="flex-1 px-2">Package Name</th>
          <th className="flex-1 px-2">Version</th>
          <th className="flex-1 px-2">Architecture</th>
          <th className="flex-1 px-2">Distro</th>
          <th className="flex-1 px-2"></th>
        </tr>
      </thead>
      <tbody className="flex-grow overflow-y-scroll scroll-smooth scrollbar-hidden">
        {packages.map((pkg, index) => (
          <TableRowItem
            key={index}
            packageName={pkg.packageName}
            version={pkg.version}
            distro={pkg.distro}
            architecture={pkg.architecture}
            infoLink={pkg.infoLink}
            downloadLink={pkg.downloadLink}
          />
        ))}
      </tbody>
    </div>
  );
};

export default Table;
