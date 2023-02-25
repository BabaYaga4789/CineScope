import { Flex, useBreakpointValue } from "@chakra-ui/react";

interface ContainerProps extends React.PropsWithChildren<any> {
  children: any;
  flexDirection?: "column" | "row";
}

<<<<<<< HEAD
export default function Container({
  flexDirection,
  children,
  ...props
}: ContainerProps) {
=======
const Container = ({ flexDirection, children, ...props }: ContainerProps) => {
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      flexDirection={flexDirection ?? "column"}
      p={isDesktop ? 12 : 6}
      borderRadius={8}
      boxShadow={"xl"}
      {...props}
    >
      {children}
    </Flex>
  );
<<<<<<< HEAD
}
=======
};

export default Container;
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
