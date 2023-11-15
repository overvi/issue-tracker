import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  itemSize: number;
}

const Padgination = ({ currentPage, totalPages, itemSize }: Props) => {
  const pages = Math.ceil(itemSize / totalPages);
  if (pages <= 1) return;
  return (
    <Flex className="gap-5 items-center">
      <Button disabled={currentPage === 1} color="gray" variant="soft">
        <DoubleArrowLeftIcon />
      </Button>
      <Button disabled={currentPage === 1} color="gray" variant="soft">
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        page {currentPage} of {pages}
      </Text>
      <Button disabled={currentPage === pages} color="gray" variant="soft">
        <ChevronRightIcon />
      </Button>
      <Button disabled={currentPage === pages} color="gray" variant="soft">
        <DoubleArrowLeftIcon />
      </Button>
    </Flex>
  );
};
export default Padgination;
