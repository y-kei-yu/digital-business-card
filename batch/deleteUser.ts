import { supabase } from "../src/utils/supabaseNode";

//昨日日付のuser_idを取得
export async function getYesterdayUserIds(): Promise<string[]> {
  //今日の日付を取得
  const today = new Date();
  //昨日の日付を取得
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const { data, error } = await supabase
    .from("users")
    .select(
      `
      user_id,
      created_at
    `
    )
    .gte("created_at", yesterday.toISOString())
    .lt("created_at", today.toISOString());

  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }
  const yesterdayData = data.map((user) => user.user_id);
  return yesterdayData;
}

//user_skillテーブルから昨日日付のuser_idのレコードを削除
export async function deleteUserSkills(userId: string[]): Promise<void> {
  // 1. user_skillテーブルから削除
  const { error: skillError } = await supabase
    .from("user_skill")
    .delete()
    .in("user_id", userId);

  if (skillError) {
    console.error("Error deleting from user_skill:", skillError.message);
    throw new Error("Failed to delete from user_skill");
  }
  console.log("Deleted user_skills:", userId);
}

//usersテーブルから昨日日付のuser_idのレコードを削除
export async function deleteUsers(userId: string[]): Promise<void> {
  // 2. usersテーブルから削除
  const { error: userError } = await supabase
    .from("users")
    .delete()
    .in("user_id", userId);

  if (userError) {
    console.error("Error deleting from users:", userError.message);
    throw new Error("Failed to delete from users");
  }

  console.log("Deleted users:", userId);
}
