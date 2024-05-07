"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import useUpdatePage from "../hook/useUpdatePage";

interface Props {
  currentPage: number;
  totalPages: number;
  itemSize: number;
  showPageN?: boolean;
}

const Padgination = ({
  currentPage,
  totalPages,
  itemSize,
  showPageN,
}: Props) => {
  const pages = Math.ceil(itemSize / totalPages);
  const updatePage = useUpdatePage();
  const params = useSearchParams();
  const pageParam = params.get("page");

  useEffect(() => {
    if (parseInt(pageParam!) > pages) {
      updatePage(1);
    }
  }, [pageParam, itemSize]);

  if (pages <= 1) return;
  return (
    <Flex className="gap-5 items-center m-auto max-w-max mt-3">
      {showPageN && (
        <Text size="2">
          page {currentPage} of {pages}
        </Text>
      )}
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
