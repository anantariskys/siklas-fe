import KlasifikasiPage from "@/modules/klasifikasi";
import { ClassifyProvider } from "@/modules/klasifikasi/context/classify-context";

export default function Klasifikasi() {
  return (
    <ClassifyProvider>
      <KlasifikasiPage />
    </ClassifyProvider>
  );
}
