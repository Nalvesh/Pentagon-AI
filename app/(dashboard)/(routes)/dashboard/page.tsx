"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight,ImageIcon,VideoIcon,CodeIcon,MusicIcon,MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
const tools=[
{
 label:"Text",
 icon: MessageSquare,
 color:"text-violet-500",
 bgcolor:"bg-violet-500/10",
 href:"/Text"
},
{
    label: "Image Genration",
    icon:ImageIcon,
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
];
const DashboardPage =()=>{
  const router = useRouter();
  return(
    <div className="mb-8 space-y-2 ">
      <h2 className="text-2xl md:text-4xl font-bold text-center">
        Explore the power of AI
      </h2>
      <p className="text-muted-foreground font-bold text-small md:text-lg text-center">
        Chat with the smartest AI - Experience the power of AI
      </p>
      <div className="px-8 md:px20 lg:px32 space-y-4">
        {tools.map((tool)=>(
          <Card 
          onClick={() => router.push(tool.href)}
          key={tool.href}
          className="p-4 border-black/5 flex item-center justify-between
          hover:shadow-md transition cursor-pointer"
          >
            <div className="flex item-center gap-x-4">
              <tool.icon className={cn("w-8 h-8",tool.color)}/>
              {tool.label}
            </div>
            <div>
              <ArrowRight className="w-5 h-5 "/>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
export default DashboardPage;