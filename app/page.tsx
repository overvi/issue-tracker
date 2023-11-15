import Padgination from "./component/Padgination";

export default function Home() {
  return (
    <div>
      <Padgination currentPage={2} itemSize={100} totalPages={10} />
    </div>
  );
}
