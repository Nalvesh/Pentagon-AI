import  Sidebar  from "@/components/Sidebar";
import Navbar from "@/components/navbar";
import { getApiLimitCount } from "@/lib/api-limit";
import { UserButton } from "@clerk/nextjs";

const   DashboardLayout  =async({
    children
}:{
    children: React.ReactNode; 
}) =>{

    const apiLimitCount = await getApiLimitCount();
    return(
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-70 md:flex-col md:fixed md:inset-y-0  
            bg-white-900 h-50">
                <Sidebar apiLimitCount={apiLimitCount}/>
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