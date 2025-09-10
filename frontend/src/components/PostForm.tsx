import { useState } from "react";
import type { Post } from "../services/backend";

type CreateProps = {
  mode: "create";
  initial?: Partial<Post>;
  onSubmit: (data: Omit<Post, "id">) => void | Promise<void>;
  onCancel?: () => void;
};

type EditProps = {
  mode: "edit";
  initial?: Partial<Post>;
  onSubmit: (data: Partial<Post>) => void | Promise<void>;
  onCancel?: () => void;
};

type Props = CreateProps | EditProps;

export default function PostForm({ mode, initial, onSubmit, onCancel }: Props) {
  const [userId, setUserId] = useState<number>(initial?.userId ?? 1);
  const [title, setTitle] = useState(initial?.title ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "create") {
      onSubmit({ userId, title });
    } else {
      onSubmit({ userId, title });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-3">
      <div className="grid gap-1">
        <label className="text-sm opacity-70">User ID</label>
        <input
          type="number"
          min={1}
          className="border rounded px-3 py-2 outline-none focus:ring w-full"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
          required
        />
      </div>

      <div className="grid gap-1">
        <label className="text-sm opacity-70">Title</label>
        <input
          className="border rounded px-3 py-2 outline-none focus:ring w-full"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 pt-1">
        <button
          type="submit"
          className="px-3 py-2 rounded border bg-black text-white hover:opacity-90"
        >
          {mode === "create" ? "Add Post" : "Save"}
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
