import React from 'react';
import './ImageUpload.css';
import { useState } from 'react'

export default function ImageUpload() {
  const [imageUrl, setImageUrl] = useState(null);
  const [imageAlt, setImageAlt] = useState(null);
  /*
  This function queries the document to get the first input element with the type of file,
then it de-structures the files array from the resulting object, 
then finally logs the first element of the array in the result to the console. */
  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]')
const formData = new FormData();
formData.append('file', files[0]);
// replace this with your upload preset name
formData.append('upload_preset', 'qv5rfbwg');
const options = {
  method: 'POST',
  body: formData,
};

// replace cloudname with your Cloudinary cloud_name
return fetch('https://api.Cloudinary.com/v1_1/:cloud_name/image/upload', options)
  .then(res => res.json())
  .then(res => {
      setImageUrl(res.secure_url)
      setImageAlt(`An image of ${res.original_filename}`)
  })
  .catch(err => console.log(err));
  }
    return (
      <main className="ImageUpload">
        <section className="left-side">
          <form>
            <div className="form-group">
              <input type="file"/>
            </div>

            <button type="button" className="btn" onClick={this.handleImageUpload}>Submit</button>
            <button type="button" className="btn widget-btn">Upload Via Widget</button>
          </form>
        </section>
        <section className="right-side">
          <p>The resulting image will be displayed here</p>
          {imageUrl && (
            <img src={imageUrl} alt={imageAlt} className="displayed-image"/>
          )}
        </section>
      </main>
    );
  }