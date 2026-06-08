import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";

import SplitPDF from "./pages/SplitPDF";
import MergePDF from "./pages/MergePDF";
import DeletePages from "./pages/DeletePages";
import ReorderPDF from "./pages/ReorderPDF";
import CompressPDF from "./pages/CompressPDF";

import EncryptPDF from "./pages/EncryptPDF";
import UnlockPDF from "./pages/UnlockPDF";

import PDFToPNG from "./pages/PDFToPNG";
import ImageToPDF from "./pages/ImageToPDF";
import RotatePDF from "./pages/RotatePDF";

import WatermarkPDF from "./pages/WatermarkPDF";
import ImageWatermarkPDF from "./pages/ImageWatermarkPDF";
import PageNumberPDF from "./pages/PageNumberPDF";
import HeaderFooterPDF from "./pages/HeaderFooterPDF";
import ExtractPDF from "./pages/ExtractPDF";
import MetadataPDF from "./pages/MetadataPDF";

function App() {
  return (
    <Routes>
      {/* 有 Sidebar Layout */}
      <Route element={<AppLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* PDF 編輯 */}
        <Route path="/split-pdf" element={<SplitPDF />} />
        <Route path="/merge-pdf" element={<MergePDF />} />
        <Route path="/delete-pages-pdf" element={<DeletePages />} />
        <Route path="/reorder-pdf" element={<ReorderPDF />} />
        <Route path="/compress-pdf" element={<CompressPDF />} />
        <Route path="/extract-pdf" element={<ExtractPDF />} />
        <Route path="/rotate-pdf" element={<RotatePDF />} />

        {/* 轉換 */}
        <Route path="/pdf-to-png" element={<PDFToPNG />} />
        <Route path="/image-to-pdf" element={<ImageToPDF />} />

        {/* 安全 */}
        <Route path="/encrypt-pdf" element={<EncryptPDF />} />
        <Route path="/unlock-pdf" element={<UnlockPDF />} />

        {/* 增強 */}
        <Route path="/watermark-pdf" element={<WatermarkPDF />} />
        <Route path="/logo-watermark-pdf" element={<ImageWatermarkPDF />} />
        <Route path="/page-number-pdf" element={<PageNumberPDF />} />
        <Route path="/header-footer-pdf" element={<HeaderFooterPDF />} />
        <Route path="/metadata-pdf" element={<MetadataPDF />} />
      </Route>
    </Routes>
  );
}

export default App;