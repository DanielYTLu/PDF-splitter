import Dropzone from "./Dropzone";
import toast from "react-hot-toast";

export default function FileUploader({
  onFile,
  multiple = false,
}) {
  return (
    <Dropzone
      multiple={multiple}
      onFile={(file) => {
        if (!file) {
          toast.error("請選擇 PDF");
          return;
        }

        onFile(file);

        toast.success(
          multiple
            ? "檔案已加入！"
            : "上傳成功！"
        );
      }}
    />
  );
}