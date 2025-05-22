import { useState, useEffect } from 'react';

import { createFileRoute } from '@tanstack/react-router';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { usersData, type User } from '@/data/users';
import { delay } from '@/lib/utils/delay';
import { Table, TableHead, TableHeader, TableBody, TableRow, TableCell } from '@/components/shadcn/table';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Input } from '@/components/shadcn/input';
import { Button } from '@/components/shadcn/button';

const userQueryOptions = queryOptions<User[]>({
  queryKey: ['users'],
  queryFn: async () => {
    await delay(1500);
    return usersData;
  },
});

const baseURL = 'https://example.com/api/users';

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

function PendingComponent() {
  return <div className="py-10 px-20 text-lg text-destructive">Loading...</div>;
}

export const Route = createFileRoute('/')({
  component: Index,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(userQueryOptions),
  pendingComponent: PendingComponent,
});

function Index() {
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [fetchUrl, setFetchUrl] = useState<string>(baseURL);
  const { data: users } = useSuspenseQuery(userQueryOptions);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    let url = `${baseURL}?page=${page}`;
    if (search) {
      url += `&search=${search}`;
    }
    setFetchUrl(url);
  }, [page, search]);

  return (
    <div className="px-20 py-10">
      <div className="flex gap-10 items-center">
        <Input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          type="search"
          placeholder="search table..."
          className="w-[350px] mb-2"
        />
        <div>Current Page: {page}</div>
        <div>Current Fetch Url: {fetchUrl}</div>
      </div>
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
      <div className="flex justify-between mt-2">
        <Button type="button" onClick={() => setPage((prev) => prev - 1)} disabled={page <= 1}>
          Previous
        </Button>
        <Button onClick={() => setPage((prev) => prev + 1)} type="button">
          Next
        </Button>
      </div>
    </div>
  );
}
