import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  type User,
} from "../services/backend";
import UserForm from "./UserForm";

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [editing, setEditing] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    })();
  }, []);

  const total = useMemo(() => users.length, [users]);

  const handleCreate = async (data: Omit<User, "id">) => {
    const created = await createUser(data);
    setUsers((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id: number, data: Partial<User>) => {
    const updated = await updateUser(id, data);
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading) return <p className="opacity-60">Loading users…</p>;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Users</h2>
        <span className="text-sm opacity-70">Total: {total}</span>
      </div>

      {/* Create */}
      <div className="rounded border p-3">
        <h3 className="font-medium mb-2">Create user</h3>
        <UserForm mode="create" onSubmit={handleCreate} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border">ID</th>
              <th className="text-left p-2 border">Name</th>
              <th className="text-left p-2 border">Username</th>
              <th className="text-left p-2 border">Email</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="p-2 border">{u.id}</td>

                <td className="p-2 border">
                  {editing?.id === u.id ? (
                    <input
                      defaultValue={u.name}
                      onChange={(e) =>
                        setEditing((p) => (p ? { ...p, name: e.target.value } : p))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    u.name
                  )}
                </td>

                <td className="p-2 border">
                  {editing?.id === u.id ? (
                    <input
                      defaultValue={u.username}
                      onChange={(e) =>
                        setEditing((p) =>
                          p ? { ...p, username: e.target.value } : p
                        )
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    u.username
                  )}
                </td>

                <td className="p-2 border">
                  {editing?.id === u.id ? (
                    <input
                      defaultValue={u.email}
                      onChange={(e) =>
                        setEditing((p) => (p ? { ...p, email: e.target.value } : p))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    u.email
                  )}
                </td>

                <td className="p-2 border whitespace-nowrap">
                  {editing?.id === u.id ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded border bg-black text-white"
                        onClick={() => handleUpdate(u.id, editing!)}
                      >
                        Save
                      </button>
                      <button
                        className="px-3 py-1 rounded border"
                        onClick={() => setEditing(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded border"
                        onClick={() => setEditing(u)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded border text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(u.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="p-3" colSpan={5}>
                  No users.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
