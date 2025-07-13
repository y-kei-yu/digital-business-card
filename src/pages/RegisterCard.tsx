import { Box, Button, FormControl, FormLabel, Heading, Input, Select, Textarea } from "@chakra-ui/react"
import { BoxBackGroundLayout } from "../components/layouts/BoxBackGroundLayout"
import { CardWhiteLayout } from "../components/layouts/CardWhiteLayout"
import { GetAllSkills } from "../utils/supabaseFunctions"
import { useEffect, useState } from "react"
import { Skill } from "../domain/skill"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { User } from "../domain/user"

export const RegisterCard = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<User>();
    const [skill, setSkill] = useState<Skill[]>([]);

    const getAllSkills = async () => {
        const allSkills = await GetAllSkills();
        setSkill(allSkills);
    }

    const onSubmit: SubmitHandler<User> = async (data) => {

        console.log("登録データ:", data);
    }

    useEffect(() => {
        getAllSkills();
    }, []);

    console.log("取得したスキル:", skill);
    return (
        <BoxBackGroundLayout>
            <Box>
                <Heading as="h1" size="lg" mb={4} textAlign="center" justifyContent="center">
                    名刺新規登録
                </Heading>
                <CardWhiteLayout>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isRequired>
                            <FormLabel>好きな英単語 </FormLabel>
                            <Input
                                type="text"
                                {...register("user_id", {
                                    required: true,
                                    pattern: {
                                        value: /^[a-zA-Z0-9_]+$/,
                                        message: "英数字とアンダースコアのみ使用できます。"
                                    }
                                })}
                            />
                            {errors.user_id && (
                                <span style={{ color: "red" }}>{errors.user_id.message}</span>
                            )}
                        </FormControl>
                        <FormControl isRequired mt={5}>
                            <FormLabel>お名前</FormLabel>
                            <Input
                                type="text"
                                {...register("name", {
                                    required: "お名前は必須です。"
                                })}
                            />
                            {errors.name && (
                                <span style={{ color: "red" }}>{errors.name.message}</span>
                            )}
                        </FormControl >
                        <FormControl isRequired mt={5}>
                            <FormLabel>自己紹介 </FormLabel>
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
                            />
                            {errors.description && (
                                <span style={{ color: "red" }}>{errors.description.message}</span>
                            )}
                        </FormControl >
                        <FormControl isRequired mt={5}>
                            <FormLabel>好きな技術</FormLabel>
                            <Controller
                                name="skill"
                                control={control}
                                rules={{ required: "好きな技術は必須です。" }}
                                render={({ field }) => (
                                    <Select placeholder="選択してください" {...field}>
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
                            />
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>Qiita ID</FormLabel>
                            <Input
                                type="text"
                                {...register("qiita_id")}
                            />
                        </FormControl>
                        <FormControl mt={5}>
                            <FormLabel>X ID</FormLabel>
                            <Input
                                type="text"
                                {...register("x_id")}
                                placeholder="@は不要です。"
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" width="full" mr={4} mt={4} mb={3} >
                            登録
                        </Button>

                        <div><span style={{ color: "red" }}>*</span>は必須項目です。</div>
                    </form>
                </CardWhiteLayout>
            </Box>

        </BoxBackGroundLayout >
    )
}