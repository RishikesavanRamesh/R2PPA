import TableRowItem from "./TableRowItem"; // Adjust the import path as necessary

// Define the type for the props
interface TableProps {
  packages: {
    packageName: string;
    version: string;
    distro: string;
    architecture: string;
    infoLink: string;
    downloadLink: string;
  }[];
}

const Table: React.FC<TableProps> = ({ packages }) => {
  return (
    <div className="flex flex-col h-full">
      <thead className="absolute sticky top-0 bg-gray-300">
        <tr className="flex flex-row">
          <th className="flex-[4.5_4.5_0%]">Package Name</th>
          <th className="flex-1">Version</th>
          <th className="flex-1">Architecture</th>
          <th className="flex-1">ROS Distro</th>
          <th className="flex-[0.5_0.5_0%]"></th>
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
