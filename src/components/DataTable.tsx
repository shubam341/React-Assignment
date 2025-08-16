import React, { useState } from "react";

export interface Column<T> {
  key: keyof T;
  header: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
}

function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const toggleRow = (row: T) => {
    let updated: T[];
    if (selectedRows.includes(row)) {
      updated = selectedRows.filter((r) => r !== row);
    } else {
      updated = [...selectedRows, row];
    }
    setSelectedRows(updated);
    onRowSelect?.(updated);
  };

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  if (loading) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (data.length === 0) {
    return <div className="p-4 text-center text-gray-500">No data available</div>;
  }

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          {selectable && <th className="p-2 border">Select</th>}
          {columns.map((col) => (
            <th
              key={String(col.key)}
              className="p-2 border cursor-pointer"
              onClick={() => handleSort(col.key)}
            >
              {col.header}{" "}
              {sortKey === col.key && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {selectable && (
              <td className="p-2 border text-center">
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row)}
                  onChange={() => toggleRow(row)}
                />
              </td>
            )}
            {columns.map((col) => (
              <td key={String(col.key)} className="p-2 border">
                {String(row[col.key])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
