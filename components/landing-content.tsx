"use client"

import { Card, CardHeader,CardContent,CardTitle } from "@/components/ui/card"

const testimonials=[{
    Name:"Rushikesh Pawar",
    avatar:"A",
    title:"Software Engineer",
    description:"This is Powerfull AI Application"
},
{
    Name:"Nalvesh ahajan ",
    avatar:"B",
    title:"Cloud Engineer",
    description:"This is Best AI Application"
},
{
    Name:"Mukta Tammadwar",
    avatar:"C",
    title:"Devops Engineer",
    description:"It's Very Powerfull and best Application i have used."
},]

export const LandingContent=()=>{
    return(
        <div className="px-10 pb-20 ">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimonials
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {testimonials.map((item)=>(
                <Card key={item.description} className="bg-[#192339] border-name text-white">
                    <CardHeader>
                        <CardTitle className="flex item-center gap-x-2">
                        <div>
                            <p className="text-lg">
                                {item.Name}
                            </p>
                            <p className="text-zinc-400 text-sm">
                                {item.title}
                            </p>
                        </div>
                        </CardTitle>
                        <CardContent className="pt-4 px-0">
                            {item.description}
                        </CardContent>
                    </CardHeader>
                </Card>
            ))}
            </div>
        </div>
    )
}
export default LandingContent;