import { useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
  imageFile,
  setFile,
  loading,
  uploadedImageUrl,
  setUploadedImageUrl,
  setLoading,
  isEditMode,
}) {
  const inputRef = useRef(null);

  function handleImageChange(e) {
    console.log(e.target.files);
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }

  function handleDragOver(e) {
    e.preventDefault();
  }

  function handleDrop(e) {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) setFile(droppedFile);
  }

  function handleRemoveImage() {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImagetoCloudinary() {
    setLoading(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/admin/products/upload-image`,
      data
    );
    if (response?.data?.success) {
      setLoading(false);
      setUploadedImageUrl(response.data.result.url);
    }
  }

  useEffect(() => {
    if (imageFile !== null) {
      uploadImagetoCloudinary();
    }
  }, [imageFile]);

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload image</Label>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={`${
          isEditMode
            ? " opacity-60 border-2 border-dashed rounded-lg p-4"
            : "border-2 border-dashed rounded-lg p-4"
        } `}
      >
        <Input
          id="image-upload"
          type="file"
          className="hidden"
          ref={inputRef}
          onChange={handleImageChange}
          disabled={isEditMode}
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode
                ? "cursor-not-allowed flex flex-col items-center justify-center h-32"
                : "flex flex-col items-center justify-center h-32 cursor-pointer"
            }`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag and Drop or Click to upload image</span>
          </Label>
        ) : loading ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 h-8 text-primary mr-2" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveImage}
            >
              <XIcon className="h-4 w-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
