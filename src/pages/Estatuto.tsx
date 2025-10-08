import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { showError } from "@/utils/toast";

// Configura o worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const Estatuto = () => {
  const pdfUrl = "/Estatuto-Gavioes.pdf";
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  function onDocumentLoadError(error: Error) {
    console.error(error);
    showError("Não foi possível carregar o PDF do estatuto.");
  }

  const goToPrevPage = () => {
    setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) =>
      Math.min(prevPageNumber + 1, numPages || 1)
    );
  };

  return (
    <PageLayout title="Estatuto">
      <div className="flex flex-col items-center gap-4">
        <div className="w-full max-w-4xl border border-gray-700 rounded-lg overflow-hidden bg-gray-900">
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div className="p-4 text-center">Carregando estatuto...</div>}
            className="flex justify-center"
          >
            <Page 
              pageNumber={pageNumber} 
              width={Math.min(window.innerWidth * 0.8, 800)} // Largura responsiva
            />
          </Document>
        </div>

        {numPages && (
          <div className="flex items-center justify-center gap-4 p-2 bg-black/50 rounded-lg">
            <Button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1}
              variant="ghost"
              size="sm"
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="ml-2">Anterior</span>
            </Button>
            <p className="text-sm font-medium">
              Página {pageNumber} de {numPages}
            </p>
            <Button
              onClick={goToNextPage}
              disabled={pageNumber >= numPages}
              variant="ghost"
              size="sm"
            >
              <span className="mr-2">Próxima</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Estatuto;