"use server";

import { updateCurrentUser } from "@/app/services/user/updateUserService";
import { revalidatePath } from "next/cache";

interface UpdateProfileData {
  name: string;
  username: string | null;
  dateOfBirth: Date | null;
  image: string | null;
}

export async function updateProfile(data: UpdateProfileData) {
  try {
    await updateCurrentUser(data);

    revalidatePath("/account");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to update profile" };
  }
}
