import {
  deleteUsers,
  deleteUserSkills,
  getYesterdayUserIds,
} from "./deleteUser";
import "dotenv/config";

export const deleteUserBatch = async () => {
  console.log("削除処理を開始します");
  const userId = await getYesterdayUserIds();
  await deleteUserSkills(userId);
  await deleteUsers(userId);
};
deleteUserBatch();
