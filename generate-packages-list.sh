#!/bin/sh

# Define the input packages file and output JS file
input_file="r2ppa/apt-repo/dists/stable/main/binary-amd64/Packages"
output_file="r2ppa-site/src/components/Data.tsx"

# Start writing to the JS file
echo "export const packages = [" > "$output_file"

# Read the input file line by line
while IFS= read -r line; do
    # Initialize variables for each package
    case "$line" in
        Package:\ *)
            fullPackageName=$(echo "$line" | sed 's/Package: //')
            # Strip "ros-humble-" prefix to get the package name
            packageName=$(echo "$fullPackageName" | sed 's/^ros-humble-//')
            distro="humble"  # Set distro to "humble"
            ;;
        Version:\ *)
            version_full=$(echo "$line" | sed 's/Version: //')
            # Extract just the version (before the first dash)
            version=$(echo "$version_full" | cut -d '-' -f 1)
            ;;
        Architecture:\ *)
            architecture=$(echo "$line" | sed 's/Architecture: //')
            ;;
        Filename:\ *)
            downloadLink=$(echo "$line" | sed 's/Filename: //')
            ;;
        "")
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
            packageName=""
            version=""
            distro=""
            architecture=""
            downloadLink=""
            ;;
    esac
done < "$input_file"

# Remove the last comma and close the array
sed -i '' '$ s/,$//' "$output_file"  # Remove last comma (with compatibility for macOS)
echo "];" >> "$output_file"            # Close the array

echo "JavaScript file '$output_file' created successfully!"
