export const tools = [
  {
    category: "編輯",
    items: [
      { title: "PDF 分割", icon: "✂️", path: "/split-pdf" },
      { title: "PDF 合併", icon: "🧩", path: "/merge-pdf" },
      { title: "刪除頁面", icon: "🗑️", path: "/delete-pages-pdf" },
      { title: "頁面排序", icon: "🔀", path: "/reorder-pdf" },
      { title: "PDF 壓縮", icon: "📉", path: "/compress-pdf" },
      { title: "提取頁面", icon: "📄", path: "/extract-pdf" },
      { title: "旋轉 PDF", icon: "🔄", path: "/rotate-pdf" },
    ],
  },

  {
    category: "轉換",
    items: [
      { title: "PDF 轉 PNG", icon: "🖼️", path: "/pdf-to-png" },
      { title: "圖片轉 PDF", icon: "🧾", path: "/image-to-pdf" },
    ],
  },

  {
    category: "安全",
    items: [
      { title: "加密 PDF", icon: "🔒", path: "/encrypt-pdf" },
      { title: "解鎖 PDF", icon: "🔓", path: "/unlock-pdf" },
    ],
  },

  {
    category: "進階",
    items: [
      { title: "文字浮水印", icon: "💧", path: "/watermark-pdf" },
      { title: "圖片浮水印", icon: "🖼️", path: "/logo-watermark-pdf" },
      { title: "頁碼", icon: "#️⃣", path: "/page-number-pdf" },
      { title: "頁首頁尾", icon: "📑", path: "/header-footer-pdf" },
      { title: "Metadata", icon: "🏷️", path: "/metadata-pdf" },
      { title: "Smart Clean",icon: "🧠",path: "/smart-clean-pdf",}
    ],
  },
  
];