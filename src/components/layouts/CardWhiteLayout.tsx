import { Card, CardBody } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type CardWhiteProps = {
    children: ReactNode;
};

export const CardWhiteLayout = memo(({ children }: CardWhiteProps) => {
    return (
        <Card
            w={{ base: '100%', sm: '90%', md: '400px' }} // iPhone SE対応＋レスポンシブ
            maxW="400px" // 画面幅を超えないように制限
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
