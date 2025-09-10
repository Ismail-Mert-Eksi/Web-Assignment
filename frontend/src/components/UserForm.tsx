import { useState } from "react";
import type { User } from "../services/backend";

type CreateProps = {
  mode: "create";
  initial?: Partial<User>;
  onSubmit: (data: Omit<User, "id">) => void | Promise<void>;
  onCancel?: () => void;
};

type EditProps = {
  mode: "edit";
  initial?: Partial<User>;
  onSubmit: (data: Partial<User>) => void | Promise<void>;
  onCancel?: () => void;
};

type Props = CreateProps | EditProps;

export default function UserForm({ mode, initial, onSubmit, onCancel }: Props) {
  const [name, setName] = useState(initial?.name ?? "");
  const [username, setUsername] = useState(initial?.username ?? "");
  const [email, setEmail] = useState(initial?.email ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      onSubmit({ name, username, email });
    } else {
      onSubmit({ name, username, email });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-sm opacity-70">Name</label>
        <input
          className="border rounded px-3 py-2 outline-none focus:ring w-full"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm opacity-70">Username</label>
        <input
          className="border rounded px-3 py-2 outline-none focus:ring w-full"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm opacity-70">Email</label>
        <input
          type="email"
          className="border rounded px-3 py-2 outline-none focus:ring w-full"
          placeholder="example@mail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="px-3 py-2 rounded border bg-black text-white hover:opacity-90"
        >
          {mode === "create" ? "Add User" : "Save"}
        </button>
        {onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </form>
  );
}
