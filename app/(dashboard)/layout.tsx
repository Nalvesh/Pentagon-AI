import  Sidebar  from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { UserButton } from "@clerk/nextjs";

const   DashboardLayout  =async({
    children
}:{
    children: React.ReactNode; 
}) =>{

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();
    return(
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-70 md:flex-col md:fixed md:inset-y-0  
            bg-white-900 h-50">
                <Sidebar isPro = {isPro}apiLimitCount={apiLimitCount}/>
            </div>
            <div className="py-5 px-3 flex justify-end">
            <UserButton afterSignOutUrl="/"/>
            </div>
            <main className="md:pl-72">
               <Navbar />
            {children}
            </main>
        </div>
       
     );
}
export default DashboardLayout;