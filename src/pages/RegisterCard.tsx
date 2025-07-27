import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea } from "@chakra-ui/react"
import { BoxBackGroundLayout } from "../components/layouts/BoxBackGroundLayout"
import { CardWhiteLayout } from "../components/layouts/CardWhiteLayout"
import { getAllSkills } from "../services/getAllSkills"
import { useEffect, useState } from "react"
import { Skill } from "../domain/skill"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { User } from "../domain/user"
import { useNavigate } from "react-router"
import { userInsertData } from "../services/userInsertData"

export const RegisterCard = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<User>();
    const [skill, setSkill] = useState<Skill[]>([]);
    const navigate = useNavigate();

    //好きな技術のプルダウンを表示させるための関数
    const getAllSkillsData = async () => {
        const allSkills = await getAllSkills();
        setSkill(allSkills);
    }

    //登録ボタンクリック時の処理
    const onSubmit: SubmitHandler<User> = async (data) => {
        console.log("登録データ:", data);
        await userInsertData(data)
        navigate("/");
    }

    //画面遷移
    const changePage = () => {
        navigate("/")
    }



    useEffect(() => {
        getAllSkillsData();
    }, []);

    //console.log("取得したスキル:", skill);
    return (
        <BoxBackGroundLayout>
            <Box>
                <Heading as="h1" size="lg" mb={4} textAlign="center" justifyContent="center" data-testid="testRegisterTitle">
                    名刺新規登録
                </Heading>
                <CardWhiteLayout>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl>
                            <FormLabel>好きな英単語 <span style={{ color: "red" }}>*</span> </FormLabel>
                            <Input
                                type="text"
                                {...register("user_id", {
                                    required: "好きな英単語は必須です",
                                    pattern: {
                                        value: /^[a-zA-Z]+$/,
                                        message: "英字のみ使用できます。"
                                    }
                                })}
                                data-testid="testRegisterWord"

                            />
                            {errors.user_id && (
                                <span style={{ color: "red" }}>{errors.user_id.message}</span>
                            )}
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>お名前 <span style={{ color: "red" }}>*</span> </FormLabel>
                            <Input
                                type="text"
                                {...register("name", {
                                    required: "お名前は必須です。"
                                })}
                                data-testid="testRegisterName"
                            />
                            {errors.name && (
                                <span style={{ color: "red" }}>{errors.name.message}</span>
                            )}
                        </FormControl >
                        <FormControl mt={5}>
                            <FormLabel>自己紹介 <span style={{ color: "red" }}>*</span> </FormLabel>
                            <Textarea
                                {...register("description", {
                                    required: "自己紹介は必須です。",
                                    maxLength: {
                                        value: 500,
                                        message: "500文字以内で入力してください。"
                                    }
                                })}
                                placeholder="<h1>HTMLタグも使用できます。</h1>"
                                height={100}
                                data-testid="testRegisterDescription"
                            />
                            {errors.description && (
                                <span style={{ color: "red" }}>{errors.description.message}</span>
                            )}
                        </FormControl >
                        <FormControl mt={5}>
                            <FormLabel>好きな技術 <span style={{ color: "red" }}>*</span> </FormLabel>
                            <Controller
                                name="skill"
                                control={control}
                                rules={{ required: "好きな技術は必須です。" }}
                                render={({ field }) => (
                                    <Select placeholder="選択してください" {...field} data-testid="testRegisterSkill">
                                        {skill.map((s) => (
                                            <option key={s.skill_id} value={s.skill_id}>
                                                {s.skill_name}
                                            </option>
                                        ))}
                                    </Select>
                                )}
                            />
                            {errors.skill && (
                                <span style={{ color: "red" }}>{errors.skill.message}</span>
                            )}
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>GitHub ID</FormLabel>
                            <Input
                                type="text"
                                {...register("github_id")}
                                data-testid="testRegisterGithubId"
                            />
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>Qiita ID</FormLabel>
                            <Input
                                type="text"
                                {...register("qiita_id")}
                                data-testid="testRegisterQiitaId"
                            />
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>X ID</FormLabel>
                            <Input
                                type="text"
                                {...register("x_id")}
                                placeholder="@は不要です。"
                                data-testid="testRegisterXId"
                            />
                        </FormControl>
                        <Box display="flex" justifyContent="space-between" mr={4} mt={4} mb={3}>
                            <Button type="submit" colorScheme="teal" width="45%"  >
                                登録
                            </Button>
                            <Button onClick={changePage} colorScheme="teal" width="45%" >
                                戻る
                            </Button>
                        </Box>



                        <div><span style={{ color: "red" }}>*</span>は必須項目です。</div>
                    </form>
                </CardWhiteLayout>

            </Box>

        </BoxBackGroundLayout >
    )
}