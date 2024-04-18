import OpenAI from "openai";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
// import { ChatCompletionMessageParam } from './node_modules/openai/index.mjs';
import { increraseApiLimit, checkApiLimit} from "@/lib/api-limit";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // This is also the default, can be omitted
});

const instructionMessage: ChatCompletionMessageParam= {
  role:"system",
  content:"Answer the question as short and quickly as possible. You must do it under 75 tokens."
}
export async function POST(
    req: Request
) 
{
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
           
            return new NextResponse ("Unauthorised", { status: 401 });
        }

        if (!openai.apiKey) {
            return new NextResponse ("OpenAI API Key not configured", { status: 500 });
        }

        if (!messages) {
            return new NextResponse ("Messages are required", { status: 400 });
        }

        const freeTrial =await checkApiLimit();

        if(!freeTrial){
            return new NextResponse("Free trial has expired.",{status:403});
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            max_tokens:75,
            temperature:0.5,
            messages:[instructionMessage, ...messages]
        });
        await increraseApiLimit();

        return NextResponse.json(response.choices[0].message);

    } catch (error) {
        console.log('[TEXT_ERROR]', error);
        return new NextResponse("Internal error", { status: 500 });
    }

  };