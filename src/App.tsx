import { InputField, DataTable } from "./components";

const sampleData = [
  { id: 1, name: "Alice", age: 24 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 28 },
];

function App() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Assignment Demo</h1>

      {/* InputField Demo */}
      <InputField
        label="Username"
        placeholder="Enter your username"
        helperText="This will be visible on your profile"
      />

      {/* DataTable Demo */}
      <DataTable
        data={sampleData}
        columns={[
          { key: "name", header: "Name" },
          { key: "age", header: "Age" },
        ]}
        selectable
        onRowSelect={(rows) => console.log("Selected:", rows)}
      />
    </div>
  );
}

export default App;
