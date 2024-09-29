import React from 'react';

const App: React.FC = () => {
    const distributions = [
        { name: "Stable", link: "/r2ppa/apt-repo/dists/stable/" }
    ];

    const distributionFiles = [
        { name: "Release File", link: "/r2ppa/apt-repo/dists/stable/Release" },
        { name: "Release GPG Signature", link: "/r2ppa/apt-repo/dists/stable/Release.gpg" },
        { name: "InRelease File", link: "/r2ppa/apt-repo/dists/stable/InRelease" }
    ];

    const packages = [
        { name: "ros-humble-swerve-drive-core_1.0.0-0jammy_amd64.deb", link: "/r2ppa/apt-repo/pool/main/binary-amd64/ros-humble-swerve-drive-core_1.0.0-0jammy_amd64.deb" },
        { name: "ros-humble-swervebot-description_0.0.0-0jammy_amd64.deb", link: "/r2ppa/apt-repo/pool/main/binary-amd64/ros-humble-swervebot-description_0.0.0-0jammy_amd64.deb" }
    ];

    return (
        <div className="p-6 bg-gray-50 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Welcome to the APT Repository</h1>
            <p className="text-gray-700">This is the main entry point of the APT repository. Below are the available distributions and packages:</p>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">Distributions</h2>
            <ul className="list-disc list-inside">
                {distributions.map((dist, index) => (
                    <li key={index}>
                        <a href={dist.link} className="text-blue-600 hover:underline">{dist.name}</a>
                    </li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">Distribution Files</h2>
            <ul className="list-disc list-inside">
                {distributionFiles.map((file, index) => (
                    <li key={index}>
                        <a href={file.link} className="text-blue-600 hover:underline">{file.name}</a>
                    </li>
                ))}
            </ul>

            <h2 className="mt-4 text-xl font-semibold text-gray-800">Packages in Main Pool</h2>
            <ul className="list-disc list-inside">
                {packages.map((pkg, index) => (
                    <li key={index}>
                        <a href={pkg.link} className="text-blue-600 hover:underline">{pkg.name}</a>
                    </li>
                ))}
            </ul>

            <div className="mt-6 text-gray-500 text-sm">
                <p>&copy; 2024 APT Repository. All rights reserved.</p>
            </div>
        </div>
    );
};

export default App;
