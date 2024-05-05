import{ auth } from "@clerk/nextjs";

import primadb from "@/lib/prismadb";
import { MAX_FREE_COUNTS } from "@/public/constants";
export const increraseApiLimit = async () => {
    const { userId }=auth();

    if(!userId){
        return;
    }

    const userApiLimit = await primadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });

    if(userApiLimit){
        await primadb.userApiLimit.update({
            where:{userId: userId},
            data:{count: userApiLimit.count +1},
        });

    }else{
        await primadb.userApiLimit.create({
            data:{userId: userId, count:1}
        });
    }

};

export const checkApiLimit = async () => {
    const { userId }= auth();

    if(!userId){
        return false;
    }

    const userApiLimit = await primadb.userApiLimit.findUnique({
        where:{
            userId: userId
        }
    });

    if(!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS){
        return true;
    }else{
        return false;
    }

};

export const getApiLimitCount = async ()=>{
    const { userId } = auth();

    if(!userId){
        return 0;
    }

    const userApiLimit = await primadb.userApiLimit.findUnique({
        where:{
            userId
        }
    });

    if(!userApiLimit){

        return 0
    }

    return userApiLimit.count;
}

