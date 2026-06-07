import Dropzone from "./Dropzone";
import toast from "react-hot-toast";

export default function FileUploader({ onFile }) {
  return (
    <Dropzone
      onFile={(file) => {
        if (!file) {
          toast.error("請選擇 PDF");
          return;
        }

        onFile(file);

        toast.success("上傳成功！");
      }}
    />
  );
}