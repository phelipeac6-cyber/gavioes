import { PageLayout } from "@/components/PageLayout";
import { DearPDF } from "dear-pdf";
import "dear-pdf/dist/dear-pdf.css";

const Estatuto = () => {
  const pdfUrl = "/Estatuto-Gavioes.pdf";

  return (
    <PageLayout title="Estatuto">
      <div className="w-full h-[calc(100vh-250px)]">
        <DearPDF source={pdfUrl} />
      </div>
    </PageLayout>
  );
};

export default Estatuto;