import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/component";

const IssuesDetailsPageLoading = () => {
  return (
    <Box className="space-y-5 max-w-xl">
      <Skeleton />
      <Flex gap="3">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose ">
        <Skeleton count={3} />
      </Card>
    </Box>
  );
};

export default IssuesDetailsPageLoading;
