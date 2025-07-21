import { Skill } from "../domain/skill";
import { supabase } from "../utils/supabase";

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
