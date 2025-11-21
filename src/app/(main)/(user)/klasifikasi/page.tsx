import KlasifikasiPage from "@/modules/user/klasifikasi";
import { ClassifyProvider } from "@/modules/user/klasifikasi/context/classify-context";

export default function Klasifikasi() {
  return (
    <ClassifyProvider>
      <KlasifikasiPage />
    </ClassifyProvider>
  );
}
