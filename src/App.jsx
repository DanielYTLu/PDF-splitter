import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import SplitPDF from "./pages/SplitPDF";
import MergePDF from "./pages/MergePDF";
import DeletePages from "./pages/DeletePages";
import ReorderPDF from "./pages/ReorderPDF";
import CompressPDF from "./pages/CompressPDF";
import ExtractPDF from "./pages/ExtractPDF";
import RotatePDF from "./pages/RotatePDF";
import EncryptPDF from "./pages/EncryptPDF";
import UnlockPDF from "./pages/UnlockPDF";
import PDFToPNG from "./pages/PDFToPNG";
import ImageToPDF from "./pages/ImageToPDF";
import WatermarkPDF from "./pages/WatermarkPDF";
import ImageWatermarkPDF from "./pages/ImageWatermarkPDF";
import PageNumberPDF from "./pages/PageNumberPDF";
import HeaderFooterPDF from "./pages/HeaderFooterPDF";
import MetadataPDF from "./pages/MetadataPDF";
import SmartCleanPDF from "./pages/SmartCleanPDF";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/split-pdf"
          element={<SplitPDF />}
        />

        <Route
          path="/merge-pdf"
          element={<MergePDF />}
        />

        <Route
          path="/delete-pages-pdf"
          element={<DeletePages />}
        />

        <Route
          path="/reorder-pdf"
          element={<ReorderPDF />}
        />

        <Route
          path="/compress-pdf"
          element={<CompressPDF />}
        />

        <Route
          path="/extract-pdf"
          element={<ExtractPDF />}
        />

        <Route
          path="/rotate-pdf"
          element={<RotatePDF />}
        />

        <Route
          path="/encrypt-pdf"
          element={<EncryptPDF />}
        />

        <Route
          path="/unlock-pdf"
          element={<UnlockPDF />}
        />

        <Route
          path="/pdf-to-png"
          element={<PDFToPNG />}
        />

        <Route
          path="/image-to-pdf"
          element={<ImageToPDF />}
        />

        <Route
          path="/watermark-pdf"
          element={<WatermarkPDF />}
        />

        <Route
          path="/logo-watermark-pdf"
          element={<ImageWatermarkPDF />}
        />

        <Route
          path="/page-number-pdf"
          element={<PageNumberPDF />}
        />

        <Route
          path="/header-footer-pdf"
          element={<HeaderFooterPDF />}
        />

        <Route
          path="/metadata-pdf"
          element={<MetadataPDF />}
        />

        <Route
          path="/smart-clean-pdf"
          element={<SmartCleanPDF />}
        />
      </Route>
    </Routes>
  );
}

export default App;