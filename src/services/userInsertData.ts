import { User } from "../domain/user";
import { supabase } from "../utils/supabase";

//ユーザーデータを登録する関数
export async function userInsertData(data: User): Promise<User> {
  const { error: userError } = await supabase.from("users").insert({
    user_id: data.user_id,
    name: data.name,
    description: data.description,
    qiita_id: data.qiita_id,
    github_id: data.github_id,
    x_id: data.x_id,
  });
  if (userError) {
    console.error("Error inserting user:", userError.message);
    throw new Error("Failed to insert user");
  }
  const { error: skillError } = await supabase.from("user_skill").insert({
    user_id: data.user_id,
    skill_id: data.skill,
  });
  if (skillError) {
    console.error("Error inserting user skill:", skillError.message);
    throw new Error("Failed to insert user skill");
  }
  console.log("Inserted user data:", data);
  return data;
}
