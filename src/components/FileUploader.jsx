import Dropzone from "./Dropzone";
import toast from "react-hot-toast";

export default function FileUploader({
  onFile,
  multiple = false,
  accept = ".pdf",
}) {
  return (
    <Dropzone
      multiple={multiple}
      accept={accept}
      onFile={(file) => {
        if (!file) {
          toast.error("請選擇檔案");
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