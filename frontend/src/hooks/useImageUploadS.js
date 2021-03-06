import { useState } from "react";

export const useImageUploadS = () => {
  const [imageUrl2, setImageUrl2] = useState(null);
  const [imageAlt2, setImageAlt2] = useState(null);
  // We will create the widget and open it up when clicked.
  const openWidget1 = () => {
    // create the widget
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: "powerstriders",
          uploadPreset: "ll7bhjxz",
        },
        (error, result) => {
          // This code only runs and gets the image
          // when we successfully open and upload the image
          if (!error && result && result.event === "success") {
            setImageUrl2(result.info.secure_url);
            setImageAlt2(`An image of ${result.info.original_filename}`);
          }
        }
      )
      .open(); // open up the widget after creation
  };

  /*
    This function queries the document to get the first input element with the type of file,
  then it de-structures the files array from the resulting object,
  then finally logs the first element of the array in the result to the console. */
  const handleImageUpload1 = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "ll7bhjxz");
    const options = {
      method: "POST",
      body: formData,
    };

    return fetch(
      "https://api.Cloudinary.com/v1_1/powerstriders/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => {
        setImageUrl2(res.secure_url);
        setImageAlt2(`An image of ${res.original_filename}`);
      })
      .catch((err) => console.log(err));
  };

  return {
    openWidget1,
    handleImageUpload1,
    imageUrl2,
    imageAlt2,
  };
};
