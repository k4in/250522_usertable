import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { usersData, type User } from '@/data/users';
import { delay } from '@/lib/utils/delay';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/shadcn/table';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

const userQueryOptions = queryOptions<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    await delay(1500);
    return usersData;
  },
});

const columnHelper = createColumnHelper<User>();

const columns = [
  columnHelper.accessor('id', {
    header: 'ID',
    cell: (info) => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('email', {
    header: 'e-Mail',
    cell: (info) => info.getValue(),
    size: 350,
  }),
];

export const Route = createFileRoute('/')({
  component: Index,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(userQueryOptions),
});

function Index() {
  const { data: users, isPending } = useSuspenseQuery(userQueryOptions);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isPending) return <div>Loading...</div>;

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
