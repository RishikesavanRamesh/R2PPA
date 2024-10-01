#!/bin/bash

# Define the input packages file and output JS file
input_file="r2ppa/apt-repo/dists/stable/main/binary-amd64/Packages"
output_file="r2ppa-site/src/components/Data.tsx"

# Start writing to the JS file
echo "export const packages = [" > "$output_file"

# Read the input file line by line
while IFS= read -r line; do
    # Extract package details using regex
    if [[ $line =~ ^Package:\ (.+) ]]; then
        fullPackageName="${BASH_REMATCH[1]}"
        # Strip "ros-humble-" prefix to get the package name
        packageName="${fullPackageName/ros-humble-/}"
        distro="humble"  # Set distro to "humble"
    elif [[ $line =~ ^Version:\ (.+) ]]; then
        version_full="${BASH_REMATCH[1]}"
        # Extract just the version (before the first dash)
        version="${version_full%%-*}"
    elif [[ $line =~ ^Architecture:\ (.+) ]]; then
        architecture="${BASH_REMATCH[1]}"
    elif [[ $line =~ ^Filename:\ (.+) ]]; then
        downloadLink="${BASH_REMATCH[1]}"
    elif [[ -z "$line" ]]; then
        # When a blank line is encountered, write the package entry to the JS file
        echo "  {" >> "$output_file"
        echo "    packageName: \"$packageName\"," >> "$output_file"
        echo "    version: \"$version\"," >> "$output_file"
        echo "    distro: \"$distro\"," >> "$output_file"
        echo "    infoLink: \"https://github.com/rishikesavanramesh/SWERVE-DRIVE\"," >> "$output_file"
        echo "    architecture: \"$architecture\"," >> "$output_file"
        echo "    downloadLink: \"./../.././r2ppa/apt-repo/$downloadLink\"," >> "$output_file"
        echo "  }," >> "$output_file"

        # Clear variables for the next package
        unset packageName version distro architecture downloadLink
    fi
done < "$input_file"

# Remove the last comma and close the array
sed -i '$ s/,$//' "$output_file"  # Remove last comma
echo "];" >> "$output_file"        # Close the array

echo "JavaScript file '$output_file' created successfully!"
