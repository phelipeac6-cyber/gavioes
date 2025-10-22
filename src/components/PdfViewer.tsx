import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Eye, EyeOff } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';

// Configurar o worker do PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
  url: string;
  title?: string;
  showControls?: boolean;
  className?: string;
}

export const PdfViewer = ({ 
  url, 
  title = "Visualizar PDF", 
  showControls = true,
  className = ""
}: PdfViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    setError(error.message);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => Math.min(Math.max(1, prevPageNumber + offset), numPages));
  };

  const downloadPdf = () => {
    const link = document.createElement('a');
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-red-500 ${className}`}>
        <p>Erro ao carregar PDF: {error}</p>
        <Button onClick={downloadPdf} variant="outline" className="mt-4">
          <Download className="w-4 h-4 mr-2" />
          Baixar PDF
        </Button>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {showControls && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <Button onClick={downloadPdf} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </Button>
        </div>
      )}

      <div className="border rounded-lg overflow-hidden">
        <div className="flex justify-center items-center min-h-[500px] bg-gray-50">
          {loading && (
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
              <p>Carregando PDF...</p>
            </div>
          )}
          
          <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={onDocumentLoadError}
            loading={<div>Carregando...</div>}
            error={<div>Erro ao carregar documento</div>}
          >
            <Page 
              pageNumber={pageNumber} 
              renderTextLayer={false}
              renderAnnotationLayer={false}
              className="max-w-full h-auto"
            />
          </Document>
        </div>
      </div>

      {showControls && !loading && numPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            variant="outline"
            size="sm"
          >
            Anterior
          </Button>
          
          <p className="text-sm text-gray-600">
            Página {pageNumber} de {numPages}
          </p>
          
          <Button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            variant="outline"
            size="sm"
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
};