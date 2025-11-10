"use client";

import { ClassifyResponse } from "@/services/classify";

interface ResultProps {
  result: ClassifyResponse;
  dosenList: any[] | null;
  loadingDosen: boolean;
}

export default function Result({ result, dosenList, loadingDosen }: ResultProps) {
  return (
    <div className="flex flex-1 h-[88.5vh] overflow-y-auto p-4 bg-gray-50">
      <div className="mt-6 w-full">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">
          Dosen dengan bidang penelitian serupa
        </h2>

        {loadingDosen ? (
          <p className="text-gray-600">Memuat daftar dosen...</p>
        ) : dosenList && dosenList.length > 0 ? (
          <div className="grid-cols-2 gap-4 grid w-full">
            {dosenList.map((dosen) => (
              <div
                key={dosen.nama + dosen.bidang_penelitian_major + dosen.bidang_penelitian_minor}
                className="bg-white p-4 rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-semibold text-gray-900">{dosen.nama}</p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">Mayor:</span> {dosen.bidang_penelitian_major || "-"}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-medium">Minor:</span> {dosen?.bidang_penelitian_minor || "-"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Tidak ada dosen yang cocok.</p>
        )}
      </div>
    </div>
  );
}
