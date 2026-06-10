export const i18n = {
  zh: {
    home: "首頁",
    profile: "個人資料",
    settings: "設定",
    myFiles: "我的檔案",
    tools: "工具分類",
    workspace: "工作區",
  },

  en: {
    home: "Home",
    profile: "Profile",
    settings: "Settings",
    myFiles: "My Files",
    tools: "Tools",
    workspace: "Workspace",
  },
};
export function t(lang, key) {
  return i18n[lang]?.[key] || key;
}