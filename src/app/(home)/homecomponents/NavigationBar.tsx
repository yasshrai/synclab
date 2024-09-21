import React from "react";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "@/assets/logo.png";
import Link from "next/link";

const NavigationBar = () => {
  return (
    <header className="w-full px-4 py-6 bg-slate-200 dark:bg-zinc-950 sticky top-0 ">
      <div className="container mx-auto flex items-center justify-between lg:justify-evenly">
        <Image
          src={logo}
          className=" lg:h-20  lg:w-52 h-10 w-24"
          alt="logo"
        ></Image>

        <NavigationMenu>
          <NavigationMenuList className="flex gap-6">
            {["Home", "Features", "Contact"].map((item) => (
              <NavigationMenuLink key={item} asChild>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100 transition-colors"
                  prefetch={false}
                >
                  {item}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default NavigationBar;
