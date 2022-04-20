import React, { useCallback ,useState} from "react";
import { useDropzone } from "react-dropzone";
import image2base64 from "../../../utils/image2base64";

const fileTypes = ["JPG", "PNG", "jpeg"];

function DragDrop({ data, setImages, images, tempImages }) {
  const [prevImage, setPrevImage] = useState("");
  const [accFile, setAccFile] = useState("");
  console.log();
  const [hoverPrevImage, setHoverPrevImage] = useState(false);
  function previewImage(e) {
    image2base64(e).then((image) => {
      setPrevImage(image);
    });
  }
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);
    previewImage(acceptedFiles[0]);
    console.log(images);
    setAccFile(acceptedFiles[0]);
    console.log(tempImages);
    const getImage = acceptedFiles[0];
    setImages((prev) => [...prev, getImage]);
  }, []);

  const onDelete = (data) => {
    console.log(data);
    setPrevImage("");
    let filterImages = images.filter((item) => item !== accFile);
    setImages(filterImages);

  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  if (prevImage !== "") {
    return (
      <div
        style={{ maxWidth: 159, maxHeight: 149 }}
        onMouseEnter={() => setHoverPrevImage(true)}
        onMouseLeave={() => setHoverPrevImage(false)}
        className="border-2 border-dashed relative hover:border-blue-100 border-gray-400 py-10 px-5 flex justify-center flex-col items-center"
      >
        <img src={prevImage} className="object-cover w-full h-full" />
        {hoverPrevImage && (
          <div className="absolute w-full h-full bg-black opacity-40">
            &nbsp;
          </div>
        )}

        {hoverPrevImage && (
          <div className="absolute">
            <button onClick={() => onDelete(data)}>
              <span className="text-white">Hapus</span>
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        {isDragActive ? (
          <div className="border-2 border-dashed  hover:border-blue-100 border-gray-400 py-10 px-5 flex justify-center flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 mt-1">Drop disini</span>
          </div>
        ) : (
          <div className="border-2 border-dashed  hover:border-blue-100 border-gray-400 py-10 px-5 flex justify-center flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-gray-700 mt-1">
              Photo {data === 1 ? "Utama" : data}
            </span>
          </div>
        )}
      </div>
    );
  }
}

export default DragDrop;
