import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import Icon from "@mdi/react";
import imageCompression from "browser-image-compression";

import { mdiCloudUploadOutline, mdiReorderHorizontal, mdiClose } from "@mdi/js";

interface UploadedFile {
  name: string;
  size: string;
  base64: string;
}

function ImageUploader({
  garmentMediaUploaded,
  onUploadedMedia,
}: {
  garmentMediaUploaded: UploadedFile[];
  onUploadedMedia: (media: UploadedFile[]) => void;
}) {
  const { themeMode } = useTheme();

  const MAX_IMAGES = 10;
  const MAX_SIZE_MB = 20;

  const [images, setImages] = useState<UploadedFile[]>(
    garmentMediaUploaded || []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const totalSize = images.reduce(
        (acc, image) => acc + parseFloat(image.size),
        0
      );

      setLoading(true); // Mostrar la barra de carga

      const promises = Array.from(files).map(async (file) => {
        if (images.length >= MAX_IMAGES) {
          alert(`Cannot upload more than ${MAX_IMAGES} images.`);
          return;
        }

        if (totalSize + file.size / (1024 * 1024) > MAX_SIZE_MB) {
          alert(`Total size cannot exceed ${MAX_SIZE_MB} MB.`);
          return;
        }

        // Opciones de compresión
        const options = {
          maxSizeMB: 1, // Establece el tamaño máximo en MB para la imagen comprimida
          maxWidthOrHeight: 1920, // Establece un tamaño máximo para el ancho o alto
          useWebWorker: true, // Usa un web worker para hacer la compresión
        };

        try {
          // Comprime la imagen
          const compressedFile = await imageCompression(file, options);
          const reader = new FileReader();
          reader.readAsDataURL(compressedFile);
          return new Promise<UploadedFile>((resolve, reject) => {
            reader.onload = () =>
              resolve({
                name: compressedFile.name,
                size: (compressedFile.size / (1024 * 1024)).toFixed(2) + " MB",
                base64: reader.result as string,
              });
            reader.onerror = (error) => reject(error);
          });
        } catch (error) {
          console.error("Error compressing the image: ", error);
        }
      });

      const uploadedFiles = (await Promise.all(promises)).filter(
        (file): file is UploadedFile => !!file
      );
      const updatedImages = [...images, ...uploadedFiles];
      setImages(updatedImages);
      onUploadedMedia(updatedImages); // Pass the full UploadedFile objects
      setLoading(false); // Ocultar la barra de carga
    }
  };

  const handleImageRemove = (indexToRemove: number) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
    onUploadedMedia(updatedImages);
  };

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.dataTransfer.setData("imageIndex", index.toString());
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const draggedImageIndex = parseInt(
      event.dataTransfer.getData("imageIndex")
    );
    if (draggedImageIndex !== index) {
      const updatedImages = [...images];
      const [draggedImage] = updatedImages.splice(draggedImageIndex, 1);
      updatedImages.splice(index, 0, draggedImage);
      setImages(updatedImages);
      onUploadedMedia(updatedImages); // Pass the updated list of UploadedFile objects
    }
  };

  return (
    <div className="mt-5">
      <div
        className={`${
          themeMode === "dark" ? "bg-[#232323]" : "bg-[#EFF1EF]"
        } rounded-lg py-[5em] flex items-center justify-center flex-col relative`}
      >
        <Icon path={mdiCloudUploadOutline} size={2} />
        <p className="font-bold text-[1.3em]">
          Drop Your Image Here, Or Browse
        </p>
        <p className="opacity-50">Supports: PNG, JPG, JPEG, WEBP</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 rounded-lg">
            <p className="text-lg font-bold text-gray-700">Loading...</p>
          </div>
        )}
      </div>
      <div className="grid grid-cols-12 gap-2 mt-5 items-center">
        {images.map((image, index) => (
          <div
            key={index}
            className="grid items-center gap-4 w-full grid-cols-12 col-span-12"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            <div className="col-span-1">
              <Icon path={mdiReorderHorizontal} size={0.8} />
            </div>
            <div
              className={`grid grid-cols-12 col-span-11 justify-between items-center ${
                themeMode === "dark" ? "bg-[#232323]" : "bg-[#EFF1EF]"
              } p-4 rounded-lg w-full gap-4`}
            >
              <div className="flex items-center gap-4 col-span-11">
                <div className="h-[5em] w-[5em] relative">
                  <img
                    src={image.base64}
                    alt={`uploaded-${index}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="font-bold text-[#1B6B44] truncate">
                    {image.name}
                  </p>
                  <p className="text-xs opacity-50">{image.size}</p>
                </div>
              </div>

              <div className="col-span-1 flex items-center justify-center">
                <div
                  onClick={() => handleImageRemove(index)}
                  className="flex items-center justify-center p-1 rounded-full bg-[#D71D30] bg-opacity-20 text-[#D71D30] border-[#D71D30] border cursor-pointer"
                >
                  <Icon path={mdiClose} size={0.5} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
