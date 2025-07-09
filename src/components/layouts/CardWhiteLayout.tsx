import { Card, CardBody } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type CardWhiteProps = {
    children: ReactNode;
};

export const CardWhiteLayout = memo(({ children }: CardWhiteProps) => {
    return (
        <Card
            w={{ base: '100%', sm: '350px' }} // base:スマホ, sm:タブレット以上
            maxW="100%" // 画面幅を超えないように制限
            p={6}
            boxShadow="lg"
            borderRadius="md"
        >
            <CardBody>
                {children}
            </CardBody>
        </Card>

    );
});
