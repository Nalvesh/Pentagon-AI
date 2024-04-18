import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/Mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
const   Navbar= async () =>{
const apiLimitCount=await getApiLimitCount();

    return(
        <div className="flex item-center p-4">
            <MobileSidebar apiLimitCount={apiLimitCount} />
            
        </div>
    );
}
export default Navbar;