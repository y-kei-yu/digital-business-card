import { Box, Flex } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type BoxBackgroundProps = {
  children: ReactNode;
};

export const BoxBackGroundLayout = memo(({ children }: BoxBackgroundProps) => {
  return (
    <Box
      bg="gray.300"
      w="100%"
      h="100%"
      position="fixed"
      top="0"
      left="0"
      p={4}
      color="black"
    >
      <Flex
        align="center"
        justify="center"
        h="100%" // 子要素（カード）を縦中央に
      >
        {children}
      </Flex>
    </Box>
  );
});
