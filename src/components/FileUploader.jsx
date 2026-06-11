import Dropzone from "./Dropzone";

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
        if (!file) return;

        onFile(file);
      }}
    />
  );
}