import { Table } from "@radix-ui/themes";
import { Skeleton } from "../component";
import IssuesToolBar from "./list/IssuesToolBar";
const IssuesLoading = () => {
  const issues = [1, 2, 3, 4, 5];

  return (
    <>
      <IssuesToolBar />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Created
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue}>
              <Table.Cell>
                <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" />
                <div className="block md:hidden">
                  <Skeleton />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <Skeleton baseColor="#a39190" highlightColor="#d4c8c7" />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default IssuesLoading;
