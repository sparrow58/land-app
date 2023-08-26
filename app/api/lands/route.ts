import { NextResponse } from "next/server";

export async function GET() {
  const landsData = {
    Id: 1,
    Name: "First Land",
    Land_size: 10,
    Land_Price: 20,
    endowment: false,
    image: null,
    created_by: 1,
    updated_by: null,
    created_at: new Date(),
    updated_at: null,
  };
  return NextResponse.json({ date: landsData }, { status: 200 });
}
