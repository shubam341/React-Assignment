import type { Meta, StoryObj } from "@storybook/react";
import DataTable from "./DataTable";

const meta: Meta<typeof DataTable> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof DataTable>;

const sampleData = [
  { id: 1, name: "Alice", role: "Developer" },
  { id: 2, name: "Bob", role: "Designer" },
  { id: 3, name: "Charlie", role: "Manager" },
];

const sampleColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
];

export const Default: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
  },
};

export const WithSelectable: Story = {
  args: {
    data: sampleData,
    columns: sampleColumns,
    selectable: true,
  },
};
