import { User } from "../domain/user";
import { supabase } from "./supabase";

export async function FetchUser(): Promise<User> {
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
    .eq("user_id", "sample-id");

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
