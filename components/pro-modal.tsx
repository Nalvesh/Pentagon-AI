"use client";

import axios from "axios";
import { useState } from "react";
import { ImageIcon,VideoIcon,CodeIcon,MusicIcon,MessageSquare, Check, Zap } from "lucide-react";

import { Dialog,
     DialogContent,
     DialogDescription,
     DialogFooter,
     DialogHeader,
     DialogTitle
     } from "@/components/ui/dialog";
     import{ useProModal }from "@/hooks/use-pro-modal";
import { Badge } from "@/components/ui/badge";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import toast from "react-hot-toast";



const tools=[
    {
     label:"Text",
     icon: MessageSquare,
     color:"text-violet-500",
     bgcolor:"bg-violet-500/10",
     
    },
    {
        label: "Image Genration",
        icon:ImageIcon,
        color: "text-pink-500 ",
    },
    {
        label: "Video Genration",
        icon:   VideoIcon,
        color: "text-yellow-500 ",
    },
    {
        label: "Code Genrator",
        icon:   CodeIcon,
        color: "text-green-500 ",
    },
    {
        label: "Music Genrator",
        icon:   MusicIcon,
        color: "text-red-500 ",
    },
    ];

export const ProModal =() =>{
    const proModal= useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () =>{

        try{
            
            setLoading(true);

           const response =  await axios.get("/api/stripe");


           window.location.href = response.data.url;
        }catch(error){
            console.log(error," STRIPE_CLIENT_ERROR");
            toast.error("something went wrong");
            
        }finally{
            setLoading(false);
        }

    };

    return(

        <Dialog open={loading || proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb2">
                       <div className="flex items-center gap-z-2 font-bold py-1">
                        Upgrade To Pentagoan 
                        <Badge variant="premium" className="uppercase text-sm py-1 ">
                          pro
                        </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2
                    text-zinc-900 font-medium">
                        {tools.map((tool)=>(

                            <Card 
                            key={tool.label}
                            className="p-3 border-black/5 flex items-center
                            justify-between"
                            >
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgcolor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)}/>
                                        
                                    </div>
                                    <div className="font-semibold text-sm">
                                      {tool.label}  
                                    </div>
                                </div>
                                <Check className="text-primary w-5h-5"/>
                                 
                            </Card>
                       ) )}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                    size="lg"
                    variant="premium"
                    className="w-full"
                    onClick={onSubscribe}
                    disabled={loading}
                    
                    
                    >
                       Upgrade 
                       <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
