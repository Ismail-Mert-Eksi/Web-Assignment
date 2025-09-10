import { useEffect, useMemo, useState } from "react";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  type Post,
} from "../services/backend";
import PostForm from "./PostForm";

export default function PostsTable() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getPosts();
      setPosts(data);
      setLoading(false);
    })();
  }, []);

  const countsByUser = useMemo(() => {
    return posts.reduce((acc, p) => {
      acc[p.userId] = (acc[p.userId] || 0) + 1;
      return acc;
    }, {} as Record<number, number>);
  }, [posts]);

  const handleCreate = async (data: Omit<Post, "id">) => {
    const created = await createPost(data);
    setPosts((prev) => [created, ...prev]);
  };

  const handleUpdate = async (id: number, data: Partial<Post>) => {
    const updated = await updatePost(id, data);
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
    setEditing(null);
  };

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  if (loading) return <p className="opacity-60">Loading posts…</p>;

  return (
    <div className="grid gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Posts</h2>
        <span className="text-sm opacity-70">
          Per user:{" "}
          {Object.entries(countsByUser)
            .map(([u, c]) => `${u}:${c}`)
            .join(", ")}
        </span>
      </div>

      {/* Create */}
      <div className="rounded border p-3">
        <h3 className="font-medium mb-2">Create post</h3>
        <PostForm mode="create" onSubmit={handleCreate} />
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded border">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-2 border">ID</th>
              <th className="text-left p-2 border">UserID</th>
              <th className="text-left p-2 border">Title</th>
              <th className="text-left p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="p-2 border">{p.id}</td>

                <td className="p-2 border">
                  {editing?.id === p.id ? (
                    <input
                      type="number"
                      defaultValue={p.userId}
                      onChange={(e) =>
                        setEditing((s) =>
                          s ? { ...s, userId: Number(e.target.value) } : s
                        )
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    p.userId
                  )}
                </td>

                <td className="p-2 border">
                  {editing?.id === p.id ? (
                    <input
                      defaultValue={p.title}
                      onChange={(e) =>
                        setEditing((s) => (s ? { ...s, title: e.target.value } : s))
                      }
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    p.title
                  )}
                </td>

                <td className="p-2 border whitespace-nowrap">
                  {editing?.id === p.id ? (
                    <div className="flex gap-2">
                      <button
                        className="px-3 py-1 rounded border bg-black text-white"
                        onClick={() => handleUpdate(p.id, editing!)}
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
                        onClick={() => setEditing(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-3 py-1 rounded border text-red-600 hover:bg-red-50"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td className="p-3" colSpan={4}>
                  No posts.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
