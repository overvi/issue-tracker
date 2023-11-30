import { Flex, Heading, Text } from "@radix-ui/themes";
import { BsDatabaseCheck } from "react-icons/bs";

const NotFoundIssue = () => {
  return (
    <Flex className=" min-h-full justify-center text-center  flex-col items-center rounded-md ">
      <BsDatabaseCheck size="85" color="#ba2d3d" />
      <Heading className="p-5" size={{ initial: "8", md: "9" }}>
        You dont have any issues
      </Heading>
      <Text className="font-bold">Create You First Issue From Top</Text>
    </Flex>
  );
};

export default NotFoundIssue;
