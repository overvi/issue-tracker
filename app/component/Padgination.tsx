"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  currentPage: number;
  totalPages: number;
  itemSize: number;
}

const Padgination = ({ currentPage, totalPages, itemSize }: Props) => {
  const pages = Math.ceil(itemSize / totalPages);
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString());
  };

  if (pages <= 1) return;
  return (
    <Flex className="gap-5 items-center">
      <Button
        onClick={() => updatePage(1)}
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
      >
        <DoubleArrowLeftIcon />
      </Button>
      <Button
        onClick={() => updatePage(currentPage - 1)}
        disabled={currentPage === 1}
        color="gray"
        variant="soft"
      >
        <ChevronLeftIcon />
      </Button>
      <Text size="2">
        page {currentPage} of {pages}
      </Text>
      <Button
        onClick={() => updatePage(currentPage + 1)}
        disabled={currentPage === pages}
        color="gray"
        variant="soft"
      >
        <ChevronRightIcon />
      </Button>
      <Button
        onClick={() => updatePage(pages)}
        disabled={currentPage === pages}
        color="gray"
        variant="soft"
      >
        <DoubleArrowRightIcon />
      </Button>
    </Flex>
  );
};
export default Padgination;
