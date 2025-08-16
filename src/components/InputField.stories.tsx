import type { Meta, StoryObj } from "@storybook/react";
import InputField from "./InputField";
import { useState } from "react";

const meta: Meta<typeof InputField> = {
  title: "Components/InputField",
  component: InputField,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof InputField>;

// A simple controlled example
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <InputField
        label="Name"
        placeholder="Enter your name"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = useState("Wrong input");
    return (
      <InputField
        label="Email"
        placeholder="Enter email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        helperText="Invalid email format"
        error
      />
    );
  },
};
