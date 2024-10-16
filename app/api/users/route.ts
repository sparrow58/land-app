import {
  checkUserEmailExist,
  checkUserPhoneExist,
  checkUserUsernameExist,
  getUsers,
} from "@/app/services/user/getUserService";
import { UserFormData } from "@/app/dataObjects/UserFormData";
import { NextRequest, NextResponse } from "next/server";
import { createUser } from "@/app/services/user/createUserService";

export async function POST(request: NextRequest) {
  const body: UserFormData = await request.json();

  if (body.email) {
    const exist = await checkUserEmailExist(body.email);
    if (exist) return getFieldErrorResponse("email", "Email already exist");
  }
  if (body.username) {
    const exist = await checkUserPhoneExist(body.username);
    if (exist)
      return getFieldErrorResponse("username", "Username already exist");
  }
  if (body.phone) {
    const exist = await checkUserUsernameExist(body.phone);
    if (exist) return getFieldErrorResponse("phone", "Phone already exist");
  }

  const user = await createUser(body);
  if (user) {
    const response = { message: "created", data: { id: user.id } };
    return NextResponse.json(response);
  } else return NextResponse.json({ error: "Couldn't create user" });
}
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const sort = searchParams.get("sort") || "createdAt";
    const order = searchParams.get("order") || "desc";
    const search = searchParams.get("search") || "";

    const { users, totalPages } = await getUsers({
      search,
      page,
      limit,
      order,
      sort,
    });

    return NextResponse.json({ users, totalPages });
  } catch (error) {
    console.error("Error in GET /api/users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getFieldErrorResponse = (field: string, message: string) =>
  NextResponse.json(
    {
      error: { field: field, message: message },
    },
    { status: 400 }
  );
