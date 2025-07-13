import { useEffect, useState } from "react";
import { FetchUser } from "../utils/supabaseFunctions";
import { User } from "../domain/user";
import { BoxBackGroundLayout } from "../components/layouts/BoxBackGroundLayout";
import { CardWhiteLayout } from "../components/layouts/CardWhiteLayout";
import { FaGithub } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { IoNewspaperOutline } from "react-icons/io5";
import { Box, Heading, IconButton, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router";

export const UserCard = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null);

    //データ取得
    const FetchUserData = async (user_id: string) => {
        const userData = await FetchUser(user_id);
        console.log("取得したユーザーデータ:", userData);

        if (userData) {
            setUser(userData);
            setIsLoading(false);
        }
        else {
            console.error("ユーザーデータが見つかりませんでした。");
        }

    }
    //useParamsで取得したidを使ってデータを取得
    /**
     * []初回マウント時（画面が最初に表示された時）だけ実行される
     * [id]idが変わるたびに実行される（最初の一回＋idの変更時）     
    */
    useEffect(() => {
        if (id) {
            FetchUserData(id);
        }
    }, [id]);


    if (isLoading) {
        return <div> Loading...</div>
    }

    return (
        <BoxBackGroundLayout>
            <CardWhiteLayout>
                <Stack>
                    <Heading fontSize={24} fontWeight="bold" textAlign="left" mb={2}>
                        {user?.name}
                    </Heading>

                    <Box>
                        <Heading fontSize={16} fontWeight="bold" textAlign="left">
                            自己紹介
                        </Heading>
                        <Text fontSize={14} color="gray.600" textAlign="left" mb={4}>
                            <div dangerouslySetInnerHTML={{ __html: user?.description ?? "" }}></div>
                        </Text>
                    </Box>
                    <Box>
                        <Heading fontSize={16} fontWeight="bold" textAlign="left" mt={4}>
                            好きな技術
                        </Heading>
                        <Text fontSize={14} color="gray.600" textAlign="left" mb={4}>
                            {user?.skill}
                        </Text>
                    </Box>


                    <Box display="flex" alignItems="center" justifyContent="space-between">
                        <IconButton
                            as="a"
                            href={user?.qiita_id}
                            aria-label="Qiitaのリンク"
                            icon={<IoNewspaperOutline />}
                            variant="ghost"
                            fontSize={36}
                            margin={4}
                        />

                        <IconButton
                            as="a"
                            href={user?.github_id}
                            aria-label="GitHubのリンク"
                            icon={<FaGithub />}
                            variant="ghost"
                            fontSize={36}
                            margin={4}
                        />
                        <IconButton
                            as="a"
                            href={user?.x_id}
                            aria-label="Xのリンク"
                            icon={<FaSquareXTwitter />}
                            variant="ghost"
                            fontSize={36}
                            margin={4}

                        />
                    </Box>
                </Stack>
            </CardWhiteLayout>
        </BoxBackGroundLayout >
    );
};
