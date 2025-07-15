import { Box, Button, FormControl, FormLabel, Heading, Input, Link } from "@chakra-ui/react"
import { BoxBackGroundLayout } from "../components/layouts/BoxBackGroundLayout"
import { CardWhiteLayout } from "../components/layouts/CardWhiteLayout"
import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../domain/user";
import { useNavigate } from "react-router";

export const TopCard = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<User> = async (user_id) => {
        console.log("登録データ:", user_id);
        navigate(`/cards/usercard/${user_id.user_id}`);
    }




    return (
        <BoxBackGroundLayout>
            <Box justifyContent="center">
                <Heading as="h1" size="lg" mb={6} textAlign="center">
                    デジタル名刺アプリ
                </Heading>

                <CardWhiteLayout>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl mt={5}>
                            <FormLabel>ID</FormLabel>
                            <Input
                                type="text"
                                {...register("user_id", {
                                    required: "IDを入力してください。"
                                })}
                            />
                            {errors.user_id && (
                                <span style={{ color: "red" }}>{errors.user_id.message}</span>
                            )}
                        </FormControl >
                        <Button type="submit" colorScheme="teal" width="full" mr={4} mt={4} mb={3} >
                            名刺を見る
                        </Button>
                    </form>
                </CardWhiteLayout>

                <Box textAlign="center" mt={5}>
                    <Link href="/cards/register">新規登録はこちら</Link>
                </Box>


            </Box>

        </BoxBackGroundLayout>
    )
}