"use client"

import {useAuth} from "@clerk/nextjs";
import TypewriterComponent from "typewriter-effect";
import Link  from "next/link";
import { Button } from "@/components/ui/button";

export const LandingHero=()=>{
    const {isSignedIn}=useAuth();
    return(
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>Welcome To Pentagon AI</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent
                        options={{
                        strings:[
                        "Text Generation",
                        "Image Generation",
                        "Code Generation",
                        "Video Generation",
                        "Music Generation",
                        
                        ],
                        autoStart: true,
                        loop: true
                        }}
                    />
                </div>
            </div>
            <div className=" text-sm  md:text-xl font-light text-zinc-400 ">
                Be more creative with AI
            </div>
            <div>
                <Link href={isSignedIn ? "/dashboard" : "/Sign-up"}>
                    <Button variant="outline" className=" text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 md:text-lg p-4 md:p-6 rounded-full font-semibold hover:text-white hover:bg-white/10">
                        Start Generating For Free
                    </Button>
                </Link>
            </div>
            <div className="text-zinc-400 text-xs md:text-sm font-normal">
                No Creadit Card required.
            </div>
        </div>
    );
};