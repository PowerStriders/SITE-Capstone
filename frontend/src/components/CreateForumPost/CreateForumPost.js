import "./CreateForumPost.css";
import CommunityNavbar from "../CommunityNavbar/CommunityNavbar";
import Navbar from "../Navbar/Navbar";
import React from "react";
import { Link } from "react-router-dom";
import { useForumPost } from "../../hooks/useForumPost";
import ImageUpload from "../ImageUpload/ImageUpload";
import { useImageUpload } from "../../hooks/useImageUpload";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function CreateForumPost({
  user,
  handleOnLogout,
  term,
  setTerm,
}) {
  const { handleImageUpload, openWidget, imageUrl, imageAlt } =
    useImageUpload();
  const {
    tagsOptions,
    CustomColorCheckbox,
    checked,
    checked1,
    checked2,
    handleChange,
    handleChange1,
    handleChange2,
    form,
    setForm,
    error,
    handleOnInputChange,
    handleOnSubmit,
    isProcessing,
  } = useForumPost({ imageUrl, imageAlt });
  function goTo(link) {
    window.location.href = link;
  }
  //Unauthenticated view
  if (!user.email) {
    return (
      <div className="total">
        <Navbar
          user={user}
          handleOnLogout={handleOnLogout}
          term={term}
          setTerm={setTerm}
        />
        <div className="title">
          <h2>You must be logged in to create a forum post.</h2>
        </div>
      </div>
    );
  }

  // Normal view
  return (
    <div className="CreateForumPost">
      <Navbar
        user={user}
        handleOnLogout={handleOnLogout}
        term={term}
        setTerm={setTerm}
      />
      <CommunityNavbar />
      <div className="container">
        <h1>CREATE A NEW FORUM POST</h1>
        {error.form && <span className="error">{error.form}</span>}
        <div className="form">
          <div className="uploadInfo">
            <ImageUpload
              handleImageUpload={handleImageUpload}
              openWidget={openWidget}
              imageUrl={imageUrl}
              imageAlt={imageAlt}
              name={"Picture"}
            />

            <div className="imgBar">
              <div className="postName">
                <p>Image Title</p>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleOnInputChange}
                />
                {error.title && <span className="error">{error.title}</span>}
              </div>
              <div className="tags">
                <p>Tags</p>
                <select
                  name="tag"
                  onChange={(event) =>
                    setForm((f) => ({ ...f, tag: event.target.value }))
                  }
                >
                  {tagsOptions.map((tag) => (
                    <option key={tag.key} value={tag.label}>
                      {tag.label}
                    </option>
                  ))}
                </select>
                {error.tag && <span className="error">{error.tag}</span>}
              </div>
              <div className="description">
                <p>Description</p>
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleOnInputChange}
                />
                {error.description && (
                  <span className="error">{error.description}</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="TOS">
          <div className="TOS1">
            <FormControl>
              <FormControlLabel
                control={
                  <CustomColorCheckbox
                    checked={checked1}
                    onChange={handleChange1}
                    required
                  />
                }
                label="I have read and agree to the Submission Policy"
              />
            </FormControl>
          </div>
          <div className="TOS2">
            <FormControl>
              <FormControlLabel
                control={
                  <CustomColorCheckbox
                    checked={checked2}
                    onChange={handleChange2}
                    required
                  />
                }
                label="I have read and agree to the Terms of Service"
              />
            </FormControl>
          </div>
        </div>

        <div className="editPageButns">
          <button className="cancel">
            <Link to="/me">Cancel</Link>
          </button>

          <button
            className="submit"
            disabled={isProcessing || !checked1 || !checked2 || !imageUrl}
            onClick={handleOnSubmit}
          >
            <Link to="/community">
              {isProcessing ? "Loading..." : "Submit"}
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}
