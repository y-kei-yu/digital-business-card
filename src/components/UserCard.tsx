import { useEffect, useState } from "react";
import { FetchUser } from "../utils/supabaseFunctions";
import { User } from "../domain/user";

export const UserCard = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User[]>([]);

    //データ取得
    const getFetchUserData = async () => {
        const userData = await FetchUser();
        console.log("取得したユーザーデータ:", userData);

        if (userData.length > 0) {
            setUser(userData);
            setIsLoading(false);
        }
        else {
            console.error("ユーザーデータが見つかりませんでした。");
        }

    }

    useEffect(() => {
        getFetchUserData();
    }, []);

    console.log(user)

    if (isLoading) {
        return <div> Loading...</div>
    }

    return (
        <>
            <ul>
                {user.map((u) => (
                    <li key={u.user_id}>
                        <div>名前：{u.name}</div>
                        <div>自己紹介：{u.description}</div>
                        <div>スキル：{u.skill}</div>
                        <div><a href={u.qiita_url}>Qiita</a></div>
                        <div><a href={u.github_url}>Github</a></div>
                        <div><a href={u.x_url}>X</a></div>
                    </li>

                ))}
            </ul>
        </>
    );
};
