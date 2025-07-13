import { Skill } from "../domain/skill";
import { User } from "../domain/user";
import { supabase } from "./supabase";

//ユーザーデータを取得する関数
export async function FetchUser(user_id: string): Promise<User> {
  const { data, error } = await supabase
    .from("users")
    .select(
      `
      user_id,
      name,
      description,
      github_id,
      qiita_id,
      x_id,
      user_skill (
        skill_id,
        skills (
          name
        )
      )
    `
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching users:", error.message);
    throw new Error("Failed to fetch users");
  }

  const user = data[0];

  const skill =
    user.user_skill
      ?.flatMap((s) => {
        if (Array.isArray(s.skills)) {
          return s.skills.map((sk) => sk.name);
        } else {
          return [(s.skills as { name: string }).name];
        }
      })
      .join(", ") ?? "";

  return User.createWithLinks(
    user.user_id,
    user.name,
    user.description,
    skill,
    user.qiita_id,
    user.github_id,
    user.x_id
  );

  console.log("Fetched user data:", user);
}

//好きな技術のプルダウンを表示させるための関数
export async function GetAllSkills(): Promise<Skill[]> {
  const { data, error } = await supabase.from("skills").select("*");

  if (error) {
    console.error("Error fetching skills:", error.message);
    throw new Error("Failed to fetch skills");
  }
  const skillData = data.map((skill) => new Skill(skill.id, skill.name));
  return skillData;
}

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
