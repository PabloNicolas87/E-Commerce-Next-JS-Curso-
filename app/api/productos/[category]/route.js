import { NextResponse } from "next/server";
import mockData from "@/data/mockData";

const sleep = (timer) => {
    return new Promise((resolve) => setTimeout(resolve, timer));
}

export async function GET(request, {params}) {
    const { category } = params;
    const data = category === "all" ? mockData : mockData.filter((data) => data.category.toLowerCase() === category.toLowerCase());
    await sleep(3000);
    return NextResponse.json(data);
}