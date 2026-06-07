import { Routes, Route } from "react-router-dom";

import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import SplitPDF from "./pages/SplitPDF";
import MergePDF from "./pages/MergePDF";
import DeletePages from "./pages/DeletePages";
import ReorderPDF from "./pages/ReorderPDF";
import CompressPDF from "./pages/CompressPDF";
import EncryptPDF from "./pages/EncryptPDF";
import PDFToPNG from "./pages/PDFToPNG";

function App() {
  return (
    <Routes>

      {/* 有 Sidebar 的 Layout Route */}
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/split" element={<SplitPDF />} />
        <Route path="/merge" element={<MergePDF />} />
        <Route path="/delete-pages" element={<DeletePages />} />
        <Route path="/reorder" element={<ReorderPDF />} />
        <Route path="/compress" element={<CompressPDF />} />
        <Route path="/encrypt" element={<EncryptPDF />} />
        <Route path="/pdf-to-png" element={<PDFToPNG />} />
      </Route>

    </Routes>
  );
}

export default App;