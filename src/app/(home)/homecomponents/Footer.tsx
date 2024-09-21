import React from "react";

const Footer = () => {
  return (
    <footer
      id="contact"
      className="w-full py-6 bg-slate-200 dark:bg-zinc-950 border-t border-slate-300 dark:border-zinc-800"
    >
      <div className="container mx-auto px-4 text-center text-white ">
        <p>&copy; {new Date().getFullYear()} SyncLab. All rights reserved.</p>
        <p>yash2154rai@gmail.com</p>
      </div>
    </footer>
  );
};

export default Footer;
