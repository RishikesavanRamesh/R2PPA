import { Mail, Bug, FileText, Key } from 'lucide-react'; // Importing relevant icons

const Footer = () => {
  return (
    <div className="flex flex-row text-xs bg-blue-300/30 h-[20px] w-[100vw] justify-between items-center self-center underline px-4">
      <p className="flex items-center">
        <Mail className="m-1" size={10} />
        Maintainer: <a href="mailto:rishikesavanramesh@proton.me" className="ml-1">rishikesavanramesh@proton.me</a>
      </p>
      <p className="flex items-center">
        <Bug className="m-1"  size={10} />
        <a href="https://github.com/your-repo/issues" className="ml-1">Report a Bug</a>
      </p>
      <p className="flex items-center">
        <Key className="m-1"  size={10} />
        <a href="/path/to/release.gpg" className="ml-1">Public Key</a>
      </p>
      <p className="flex items-center">
        <FileText className="m-1"  size={10} />
        <a href="/path/to/release.gpg" className="ml-1">Release GPG</a>
      </p>
    </div>
  );
}

export default Footer;
