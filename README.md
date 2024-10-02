# r2ppa 

Welcome to r2ppa! This is an APT repository that I’ve put together to host and distribute ROS 2 packages I develop over time. My goal is to simplify the installation process for my pre-built packages, making it easier for me to integrate them into my projects.

## What is r2ppa?

**r2ppa** is an APT repository hosted on GitHub Pages. While it’s not a Personal Package Archive (PPA) in the traditional sense, it provides similar functionality for anyone, offering a central spot for my packages.

## Features

- **Easy Installation**: Quickly install my ROS 2 packages via APT.
- **Hosted on GitHub Pages**: Highly reliable as it is of GitHub's infrastructure.
- **Integrated CI/CD**: Managed with [Earthly](https://earthly.dev) for continuous integration and delivery, ensuring packages are always up to date.
- **Web Search Interface**: Easily browse and search through available packages at [https://rishikesavanramesh.github.io/R2PPA](https://rishikesavanramesh.github.io/R2PPA).

## How to Use

### Step 1: Add the Repository

To add the r2ppa repository to your APT sources list, run the following command:

```bash
sudo wget -O - https://rishikesavanramesh.github.io/R2PPA/public.key | sudo gpg --dearmor -o /usr/share/keyrings/r2ppa-repo.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/r2ppa-repo.gpg] https://rishikesavanramesh.github.io/R2PPA/r2ppa/apt-repo stable main" > /etc/apt/sources.list.d/r2ppa-repo.list
sudo apt update
```

### Step 2: Update APT

After adding the repository, update your package list:

```bash
sudo apt update
```

### Step 3: Install packages

You can now install my ROS 2 packages using:

```bash
sudo apt install <package-name>
```
Just replace ```<package-name>``` with the name of the package you want to install.

### Step 4: Remove the Repository (if needed)

If you wish to remove the repository, delete the .list file:

```bash
sudo rm /etc/apt/sources.list.d/r2ppa-repo.list
```

## Feedback and Contributions

If you have any feedback or suggestions, please feel free to reach out! I’m always open to ideas for improvement. Your support means a lot!
