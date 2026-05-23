import { useDropzone } from "react-dropzone";
import { Upload, FileText, X } from "lucide-react";

export default function UploadZone({ files, setFiles }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [], "application/pdf": [] },
    maxFiles: 10,
    onDrop: (accepted) => setFiles((prev) => [...prev, ...accepted]),
  });

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="mx-auto mb-3 text-gray-400" size={36} />
        <p className="text-gray-600 font-medium">
          {isDragActive ? "Drop files here" : "Drag & drop your travel documents"}
        </p>
        <p className="text-gray-400 text-sm mt-1">PDF, JPG, PNG supported · Up to 10 files</p>
        <button
          type="button"
          className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
        >
          Browse Files
        </button>
      </div>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, i) => (
            <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2">
              <div className="flex items-center gap-2 text-sm text-gray-700">
                <FileText size={16} className="text-blue-500" />
                <span className="truncate max-w-xs">{file.name}</span>
                <span className="text-gray-400">({(file.size / 1024).toFixed(0)} KB)</span>
              </div>
              <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500">
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}