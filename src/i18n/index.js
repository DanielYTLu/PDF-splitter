export const i18n = {
  zh: {
    nav: {
      home: "首頁",
    },

    common: {
      search: "搜尋工具...",
      notifications: "通知",

      pdfDone: "PDF 處理完成",
      encrypted: "檔案已加密",
      update: "新版本更新",

      theme: "主題",
      language: "語言",

      light: "淺色模式",
      dark: "深色模式",

      exportFormat: "預設匯出格式",

      autoSave: "自動儲存",
      enableAutoSave: "啟用自動儲存",

      customize: "自訂你的工作區體驗",

      logout: "登出",

      searchResults: "搜尋結果",
      quickActions: "快速工具",

      professionalToolkit: "專業 PDF 工具箱",

      noResults: "找不到工具",
      tryAnotherKeyword: "請嘗試其他關鍵字",
    },

    categories: {
      edit: "編輯",
      convert: "轉換",
      security: "安全",
      advanced: "進階",
    },

    tools: {
      splitPdf: "PDF 分割",
      mergePdf: "PDF 合併",
      pdfToPng: "PDF 轉 PNG",
      reorderPdf: "頁面排序",
      compressPdf: "PDF 壓縮",
      extractPdf: "提取頁面",
      rotatePdf: "旋轉 PDF",

      imageToPdf: "圖片轉 PDF",

      encryptPdf: "加密 PDF",
      unlockPdf: "解鎖 PDF",

      watermarkPdf: "文字浮水印",
      imageWatermarkPdf: "圖片浮水印",

      pageNumberPdf: "頁碼",
      headerFooterPdf: "頁首頁尾",

      metadataPdf: "Metadata",
      smartCleanPdf: "Smart Clean",
    },

    toolsDesc: {
      splitPdfDesc: "快速拆分 PDF 頁面",
      mergePdfDesc: "合併多個 PDF 檔案",
      pdfToPngDesc: "轉換 PDF 為圖片",
      reorderPdfDesc: "重新排列 PDF 頁面",
      compressPdfDesc: "縮小 PDF 檔案大小",
      extractPdfDesc: "提取指定頁面",
      rotatePdfDesc: "旋轉 PDF 頁面",

      imageToPdfDesc: "將圖片轉為 PDF",

      encryptPdfDesc: "為 PDF 加上密碼保護",
      unlockPdfDesc: "解除 PDF 密碼限制",

      watermarkPdfDesc: "新增文字浮水印",
      imageWatermarkPdfDesc: "新增圖片浮水印",

      pageNumberPdfDesc: "自動加入頁碼",
      headerFooterPdfDesc: "新增頁首與頁尾",

      metadataPdfDesc: "編輯 PDF Metadata",
      smartCleanPdfDesc: "智慧清理 PDF 文件",
       myFiles: "我的檔案",
  profile: "個人資料",
  settings: "設定",
    },
  },

  en: {
    nav: {
      home: "Home",
    },

    common: {
      search: "Search tools...",
      notifications: "Notifications",

      pdfDone: "PDF processing completed",
      encrypted: "File encrypted",
      update: "New version available",

      theme: "Theme",
      language: "Language",

      light: "Light",
      dark: "Dark",

      exportFormat: "Default Export Format",

      autoSave: "Auto Save",
      enableAutoSave: "Enable Auto Save",

      customize: "Customize your workspace experience",

      logout: "Logout",

      searchResults: "Search Results",
      quickActions: "Quick Actions",

      professionalToolkit: "Professional PDF Toolkit",

      noResults: "No tools found",
      tryAnotherKeyword: "Try another keyword",
    },

    categories: {
      edit: "Edit",
      convert: "Convert",
      security: "Security",
      advanced: "Advanced",
    },

    tools: {
      splitPdf: "Split PDF",
      mergePdf: "Merge PDF",
      pdfToPng: "PDF to PNG",
      reorderPdf: "Reorder Pages",
      compressPdf: "Compress PDF",
      extractPdf: "Extract Pages",
      rotatePdf: "Rotate PDF",

      imageToPdf: "Image to PDF",

      encryptPdf: "Encrypt PDF",
      unlockPdf: "Unlock PDF",

      watermarkPdf: "Text Watermark",
      imageWatermarkPdf: "Image Watermark",

      pageNumberPdf: "Page Numbers",
      headerFooterPdf: "Header & Footer",

      metadataPdf: "Metadata",
      smartCleanPdf: "Smart Clean",
    },

    toolsDesc: {
      splitPdfDesc: "Split PDF pages quickly",
      mergePdfDesc: "Merge multiple PDF files",
      pdfToPngDesc: "Convert PDF into images",
      reorderPdfDesc: "Reorder PDF pages",
      compressPdfDesc: "Reduce PDF file size",
      extractPdfDesc: "Extract selected pages",
      rotatePdfDesc: "Rotate PDF pages",

      imageToPdfDesc: "Convert images into PDF",

      encryptPdfDesc: "Protect PDF with password",
      unlockPdfDesc: "Remove PDF password restrictions",

      watermarkPdfDesc: "Add text watermark",
      imageWatermarkPdfDesc: "Add image watermark",

      pageNumberPdfDesc: "Insert page numbers automatically",
      headerFooterPdfDesc: "Add headers and footers",

      metadataPdfDesc: "Edit PDF metadata",
      smartCleanPdfDesc: "Clean PDF intelligently",

        myFiles: "My Files",
  profile: "Profile",
  settings: "Settings",
    },
  },
};

// ✅ FIXED t()
export function t(lang, key) {
  if (!key) return "";

  return key.split(".").reduce((obj, k) => obj?.[k], i18n[lang]) || key;
}