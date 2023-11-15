import Padgination from "./component/Padgination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div>
      <Padgination
        currentPage={parseInt(searchParams.page)}
        itemSize={100}
        totalPages={10}
      />
    </div>
  );
}
