"use client";
import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { CodeIcon, ImageIcon, LayoutDashboard, MessageSquare, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";
import { FreeCounter } from "./free-counter";
const monsterrat=Montserrat({weight:"600",subsets:["latin"]});
const routes=[{
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-blue-500",
},
{
    label: "Text",
    icon: MessageSquare,
    href: "/Text",
    color: "text-violet-500 ",
},
{
    label: "Image Genration",
    icon:   ImageIcon,
    href: "/Image",
    color: "text-pink-500 ",
},
{
    label: "Video Genration",
    icon:   VideoIcon,
    href: "/video",
    color: "text-yellow-500 ",
},
{
    label: "Code Genrator",
    icon:   CodeIcon,
    href: "/code",
    color: "text-green-500 ",
},
{
    label: "Music Genrator",
    icon:   MusicIcon,
    href: "/music",
    color: "text-red-500 ",
},
{
    label: "Settings",
    icon:   SettingsIcon,
    href: "/Settings",
},
];

interface SidebarProps{
    apiLimitCount: number
};

const Sidebar =({
    apiLimitCount =0
}:SidebarProps) =>{
    const pathname=usePathname();
    return(
        <div className="space-y-4 py-4 flex flex-col h-full bg-[#1c273c] text-white">
           <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex item-center pl-3 mb-14" >
                    <div className="relative w-8 h-8 mr-4">
                        <Image fill alt="Logo" src="/logo.png">
                        </Image>
                    </div>
                    <h1 className={cn("text-2xl font-bold",monsterrat.className)}>
                        Pentagon-AI
                    </h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route)=>(
                        <Link href={route.href}
                        key={route.href}
                        className={cn("test-sm group flex p-3 w-full justify-start font-medium cusrsor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",pathname=== route.href ? "text-white bg-white/10":"text-zinc-400" )}>
                            <div className="flex item-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3",route.color)}/>
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
           </div>
           <FreeCounter
           apiLimitCount={apiLimitCount}
           
           />
        </div>
    );
} 
    export default Sidebar;