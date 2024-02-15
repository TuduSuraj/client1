import axios from "axios";
import { useState } from "react";
import {
  Trash,
  Star,
  SolidStar,
  Upload,
} from "./images/PhotoUploaderImage.jsx";

// Upload using link////////
export default function PhotosUploader({ addedPhotos, setAddedPhotos }) {
  const [photoLink, setPhotoLink] = useState("");

  async function addPhotoByLink(ev) {
    ev.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  ///Upload using Files //////
  function uploadPhoto(ev) {
    const files = ev.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form" },
      })
      .then((response) => {
        const { data: filename } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filename];
        });
        // console.log(filename, "30line");
      });
  }
  function removePhoto(ev, filename) {
    ev.preventDefault();
    setAddedPhotos([...addedPhotos.filter((photo) => photo !== filename)]);
  }
  function selectAsMainPhoto(ev, filename) {
    ev.preventDefault();
    const addedPhotosWithoutSelected = addedPhotos.filter(
      (photo) => photo !== filename
    );
    const newAddedPhotos = [filename, ...addedPhotosWithoutSelected];
    setAddedPhotos(newAddedPhotos);
  }

  ///component/////
  return (
    <>
      <div className="flex gap-2">
        <input
          value={photoLink}
          onChange={(ev) => setPhotoLink(ev.target.value)}
          type="text"
          placeholder={"Add using a link ....jpg"}
        />
        <button
          onClick={addPhotoByLink}
          className="bg-gray-200 px-4 rounded-2xl"
        >
          Add&nbsp;photo
        </button>
      </div>

      <div className="mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {addedPhotos.length > 0 &&
          addedPhotos.map((link) => (
            <div className="h-32 flex relative " key={link}>
              <img
                className="rounded-2xl w-full object-cover"
                src={"http://localhost:4000/uploads/" + link}
                alt=""
              />
              <button
                onClick={(ev) => removePhoto(ev, link)}
                className=" absolute bottom-1 cursor-pointer right-1 text-white bg-black bg-opacity-50 rounded-2xl p-1 "
              >
                <Trash />
              </button>
              <button
                onClick={(ev) => selectAsMainPhoto(ev, link)}
                className=" absolute bottom-1 cursor-pointer left-1 text-white bg-black bg-opacity-50 rounded-2xl p-1 "
              >
                {link === addedPhotos[0] && <SolidStar />}
                {link !== addedPhotos[0] && <Star />}
              </button>
              {console.log(link)}
            </div>
          ))}
        <label className="cursor-pointer flex  items-center gap-1 border bg-transparent rounded-2xl p-2 h-32 text-2xl text-gray-600">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={uploadPhoto}
          />
          <Upload />
          Upload
        </label>
      </div>
    </>
  );
}
