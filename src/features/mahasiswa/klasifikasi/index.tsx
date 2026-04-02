"use client";

import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  getDosenByBidangPenelitian,
  GetDosenByBidangPenelitianResponse,
} from "@/services/user/dosen/get-dosen-by-bidang-penelitian";

import Result from "./components/result";
import Form from "./components/form";
import { useClassify } from "./context/classify-context";

export default function KlasifikasiPage() {
  const { data: session } = useSession();
  const { result, setResult } = useClassify();
  const userRole = session?.user?.role?.toLowerCase();
  const [dosenList, setDosenList] = useState<
    GetDosenByBidangPenelitianResponse["data"]["dosen"] | null
  >(null);

  const {
    data: dosenData,
    isLoading: loadingDosen,
    isSuccess,
  } = useQuery({
    queryKey: ["dosen", result?.kategori],
    queryFn: () =>
      getDosenByBidangPenelitian({
        bidangPenelitianSlug: slugify(
          (result?.kategori || "").replace(/&/g, ""),
          {
            lower: true,
            strict: true,
            remove: /&/g,
          }
        ),
      }),
    enabled: !!result?.kategori && userRole === "mahasiswa",
  });

  useEffect(() => {
    if (isSuccess && dosenData) {
      setDosenList(dosenData.data.dosen);
    }
  }, [isSuccess, dosenData]);

  return (
    <div className="relative w-full items-center justify-center gap-8">
      {result ? (
        <Result
          result={result}
          dosenList={dosenList}
          loadingDosen={loadingDosen}
          userRole={userRole}
          onReset={() => setResult(null)}
        />
      ) : (
        <Form setResult={setResult} />
      )}
    </div>
  );
}
