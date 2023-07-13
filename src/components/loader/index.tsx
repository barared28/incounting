import { Flex, LoadingOverlay } from "@mantine/core";
import { useStylesLoader } from "./styles";

const Loader = () => {
  const { classes } = useStylesLoader();
  return (
    <Flex className={classes.container}>
      <LoadingOverlay visible />
    </Flex>
  );
};

export default Loader;
