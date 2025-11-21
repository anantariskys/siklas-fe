"use client";

import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import { useEffect, useState } from "react";
import {
  getDosenByBidangPenelitian,
  GetDosenByBidangPenelitianResponse,
} from "@/services/user/dosen/get-dosen-by-bidang-penelitian";

import Result from "./components/result";
import Form from "./components/form";
import { useClassify } from "./context/classify-context";

export default function KlasifikasiPage() {
  const { result, setResult } = useClassify();
  const [dosenList, setDosenList] = useState<
    GetDosenByBidangPenelitianResponse["data"]["dosen"] | null
  >(null);

  const {
    data: dosenData,
    isLoading: loadingDosen,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["dosen", result?.kategori],
    queryFn: () =>
      getDosenByBidangPenelitian({
        bidangPenelitianSlug: slugify(result?.kategori || "", { lower: true }),
      }),
    enabled: !!result?.kategori,
  });

  useEffect(() => {
    if (isSuccess && dosenData) {
      setDosenList(dosenData.data.dosen);
    }
  }, [isSuccess, dosenData]);

  return (
    <div className=" gap-8 items-center w-full relative  justify-center">
      {result ? (
        <Result
          result={result}
          dosenList={dosenList}
          loadingDosen={loadingDosen}
        />
      ) : (
        <Form setResult={setResult} />
      )}
    </div>
  );
}
