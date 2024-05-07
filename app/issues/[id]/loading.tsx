import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/component";

const IssuesDetailsPageLoading = () => {
  return (
    <Box className="space-y-5 max-w-xl">
      <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" />
      <Flex gap="3">
        <Skeleton width="5rem" baseColor="#a39190" highlightColor="#d4c8c7" />
        <Skeleton width="8rem" baseColor="#a39190" highlightColor="#d4c8c7" />
      </Flex>
      <Card className="prose ">
        <Skeleton count={3} baseColor="#a39190" highlightColor="#d4c8c7" />
      </Card>
    </Box>
  );
};

export default IssuesDetailsPageLoading;
