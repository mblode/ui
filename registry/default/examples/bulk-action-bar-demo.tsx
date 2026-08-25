"use client";

import { rowSelectionFeature, tableFeatures, useTable } from "@tanstack/react-table";
import type { ColumnDef, RowSelectionState } from "@tanstack/react-table";
import { MailIcon, TrashIcon } from "blode-icons-react";
import { useState } from "react";
import { BulkActionBar } from "@/registry/default/ui/bulk-action-bar";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/registry/default/ui/table";

// Selection is the only feature this table needs, so it is the only one
// registered — filtering, sorting, and pagination are tree-shaken out.
const features = tableFeatures({ rowSelectionFeature });

type BulkActionBarFeatures = typeof features;

interface Contact {
  company: string;
  email: string;
  id: string;
  name: string;
}

const contacts: Contact[] = [
  { company: "Northwind", email: "ada@northwind.com", id: "1", name: "Ada Whitfield" },
  { company: "Lumen Labs", email: "bo@lumenlabs.io", id: "2", name: "Bo Nakamura" },
  { company: "Fern & Co", email: "cleo@fernco.com", id: "3", name: "Cleo Marsh" },
  { company: "Halyard", email: "dev@halyard.dev", id: "4", name: "Dev Anand" },
  { company: "Northwind", email: "esme@northwind.com", id: "5", name: "Esme Kowalski" },
];

const columns: ColumnDef<BulkActionBarFeatures, Contact>[] = [
  {
    cell: ({ row }) => (
      <Checkbox
        aria-label={`Select ${row.original.name}`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    header: ({ table }) => (
      <Checkbox
        aria-label="Select all contacts"
        checked={table.getIsAllPageRowsSelected()}
        indeterminate={table.getIsSomePageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    id: "select",
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "company", header: "Company" },
];

// oxlint-disable-next-line react/react-compiler -- React Compiler skips this component because TanStack Table's useTable returns non-memoizable functions
export const BulkActionBarDemo = () => {
  // Seeded so the preview shows the bar itself, which is hidden at zero selected.
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    1: true,
    3: true,
  });

  const table = useTable({
    columns,
    data: contacts,
    features,
    getRowId: (row) => row.id,
    onRowSelectionChange: setRowSelection,
    state: { rowSelection },
  });

  const selectedCount = table.getSelectedRowModel().rows.length;
  const noun = selectedCount === 1 ? "contact" : "contacts";

  return (
    // `relative` is the bar's anchor, and the bottom padding keeps the floating
    // bar off the last row.
    <div className="relative w-full pb-16">
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <table.FlexRender header={header} />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow data-state={row.getIsSelected() && "selected"} key={row.id}>
                {row.getAllCells().map((cell) => (
                  <TableCell key={cell.id}>
                    <table.FlexRender cell={cell} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <BulkActionBar count={selectedCount} onClear={() => setRowSelection({})}>
        {/* The count line says "2 selected" an inch to the left, so the buttons carry
            the verb alone. The noun stays in the accessible name, which is read
            without that context. */}
        <Button aria-label={`Email ${selectedCount} ${noun}`} size="xs" variant="outline">
          <MailIcon data-icon="inline-start" />
          Email
        </Button>
        <Button aria-label={`Delete ${selectedCount} ${noun}`} size="xs" variant="destructive">
          <TrashIcon data-icon="inline-start" />
          Delete
        </Button>
      </BulkActionBar>
    </div>
  );
};
