"use client";

export default function ActionButtons({ id }: { id: string }) {
  async function handleDelete() {
    await fetch("/api/products", {
      method: "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    location.reload();
  }

  return (
    <div className="flex gap-2">
      <a href={`/dashboard/products/${id}/edit`} className="text-blue-600">
        Edit
      </a>
      <button onClick={handleDelete} className="text-red-600">
        Delete
      </button>
    </div>
  );
}
