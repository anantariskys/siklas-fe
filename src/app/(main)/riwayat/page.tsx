'use client'
import { toast } from "sonner";

export default function Riwayat() {
  return (
    <button
      onClick={() => toast.success("Sonner jalan nih!")}
      className="p-2 bg-blue-500 text-white rounded"
    >
      Tes Toast
    </button>
  );
}