import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps{
   title:string;
   description:string;
   icon:LucideIcon;
   iconcolor?:string;
   bgcolor?:string;
}

export const Heading=({
    title,
    description,
    icon:Icon,
    iconcolor,
    bgcolor,
}:HeadingProps)=>{
    return(
        <>
        <div className="px-4 lg:px-8 flex item-center gap-x-3 mb-8">
            <div className={cn("p-1 w-fit rounded-md bgColor")}>
                <Icon className={cn("w-8 h-8",iconcolor)}
                />
             
            </div>
            <div className="text-2xl font-bold ">
                <h1>
                    {title}
                </h1>
                <p className="text-sm text-muted-foreground">
                    {description}
                </p>
            </div>
        </div>
        </>
    )
}