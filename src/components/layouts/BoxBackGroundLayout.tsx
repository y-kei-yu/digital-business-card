import { Box } from "@chakra-ui/react";
import { memo, ReactNode } from "react";

type BoxBackgroundProps = {
  children: ReactNode;
};

export const BoxBackGroundLayout = memo(({ children }: BoxBackgroundProps) => {
  return (
    <Box
      bg="gray.300"
      w="100%"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
      py={2}
      color="black"
    >
      {children}
    </Box>
  );
});
