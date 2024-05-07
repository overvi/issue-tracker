import { useRouter, useSearchParams } from "next/navigation";

const useUpdatePage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updatePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push("?" + params.toString(), { scroll: false });
  };

  return updatePage;
};

export default useUpdatePage;
