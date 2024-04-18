"use client";

import axios from "axios";
import * as z from "zod";
import { Heading } from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { formschema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";
import { useProModal } from "@/hooks/use-pro-modal";

const Text = () =>{
    const proModal=useProModal();
    const router=useRouter();
    const [messages,setMessages]=useState<ChatCompletionMessageParam[]>([]);

    const form= useForm<z.infer<typeof formschema>>({
        resolver:zodResolver(formschema),
        defaultValues:{
            prompt:""
        }
    });
    const isLoading=form.formState.isSubmitting;

    const onSubmit=async(values:z.infer<typeof formschema>)=>{
      try{

        const userMessage:ChatCompletionMessageParam ={
          role:"user",
          content:values.prompt,
        };
        const newMessages=[...messages,userMessage];

        const response= await axios.post("/api/Text",{messages:newMessages});

        setMessages((current)=>[...current,userMessage,response.data]);
        form.reset();
      }
      catch(error:any)
      {
        if(error?.response?.status===403){

            proModal.onOpen();

        }
     
      }
      finally
      {
        router.refresh();
      }
    };
    return (
        <div>
            <Heading 
                title="Text"
                description="Our most advanced conversation model."
                icon={MessageSquare}
                iconcolor="text-violet-500"
                bg-color="bg-violet-500/10"
            />
            <div className="px4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="rounded-lg border w-full p-4 px-3 md:px-6 
                            focus-within:shadow-sm
                            grid-cols-12
                            gap-2">
                              <FormField 
                                name="prompt"
                                render={({field})=>(
                                    <FormItem className="col-span-12 lg:col-span-10">
                                        <FormControl className="m-0 p-0">
                                            <Input 
                                            className="border-0 outline-none focus-visible:ring-0 
                                            focus-visible:ring-transparent"
                                            disabled={isLoading}
                                            placeholder="How do i calculate radius of circle"
                                            {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                                />
                                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}>Generate</Button>
                        </form>   
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    <div className="flex flex-col-reverse gap-y-4">
                        {messages.map((message)=>(
                            <div key={String(message.content)}>
                                {String(message.content)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Text;