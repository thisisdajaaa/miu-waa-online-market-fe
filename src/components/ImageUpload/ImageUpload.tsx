import { FC, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { BiCamera } from "react-icons/bi";
import { MdClose } from "react-icons/md";

import clsxm from "@/utils/clsxmUtil";

import Button from "@/components/Button";

import type { ImageUploadProps } from "./types";

const ImageUpload: FC<ImageUploadProps> = (props) => {
  const { value, onChange, label, isRequired, containerClassname, hasError } =
    props;

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      onChange(acceptedFiles[0]);
    },
    noClick: false,
    noKeyboard: true,
  });

  const memoizedValue = useMemo(() => {
    return value
      ? typeof value !== "string" && value instanceof File
        ? URL.createObjectURL(value as File)
        : value
      : null;
  }, [value]);

  const handleClearImage = () => onChange(null);

  return (
    <div className={clsxm("relative w-full", containerClassname)}>
      <label className="form-control w-full">
        {label && (
          <div className="label">
            <span className="label-text font-bold">
              {label} {isRequired && <span className="text-accent">*</span>}
            </span>
          </div>
        )}
      </label>

      <div
        {...getRootProps({ className: "dropzone" })}
        className={clsxm(
          "relative w-full h-64 rounded-lg overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-100 cursor-pointer",
          hasError && "border-error"
        )}
      >
        <input {...getInputProps()} />
        {memoizedValue ? (
          <div className="relative w-full h-full">
            <img
              alt="Uploaded cover"
              src={memoizedValue}
              className="object-cover w-full h-full"
            />
            <Button
              variant="default"
              onClick={handleClearImage}
              className="absolute top-3 right-3 z-30 flex h-8 min-h-min items-center justify-center bg-white bg-opacity-75 rounded-full p-2"
            >
              <MdClose size={16} />
            </Button>
          </div>
        ) : (
          <div className="text-center">
            <div className="text-4xl text-gray-400 mb-2 flex justify-center">
              <BiCamera size={48} />
            </div>
            <p className="text-gray-500">Add Photo</p>
            <p className="text-gray-400 text-sm">or drag and drop</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
