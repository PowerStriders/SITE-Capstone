import "./EditForum.css";
import Navbar from "../Navbar/Navbar";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import { useEditForum } from "../../hooks/useEditForum";

export default function EditForum({ user, handleOnLogout, term, setTerm }) {
  const { handleDelete, posts } = useEditForum({ user });

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
          <h2>You must be logged in to view your portfolio posts.</h2>
        </div>
      </div>
    );
  }
  return (
    <div className="EditForum">
      <Navbar
        user={user}
        handleOnLogout={handleOnLogout}
        term={term}
        setTerm={setTerm}
      />
      <div className="content">
        <h3 className="title">Edit Your Forum</h3>
      </div>
      {posts.map((post) => (
        <div className="portfolioposts" key={post.photoPostId}>
          <div className="portfolioImg">
            <Link to={`/post/${post.photoPostId}`}>
              <img
                className="portfolioImg"
                src={`${post.imgPostUrl}`}
                alt={`Post ${post.photoPostId}`}
              />
            </Link>
          </div>
          <div className="post" style={{ position: "relative" }}>
            <h4 className="portfolioTitle"> {post.postTitle}</h4>
            <p className="portfolioDescription"> {post.postDescription}</p>
            <p className="likeComments">
              {" "}
              {/* <EditIcon style={{ fontSize: "20px" }} />{" "} */}
              <button
                className="clear"
                onClick={() => handleDelete(post.photoPostId)}
              >
                <DeleteIcon className="icon" />{" "}
              </button>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}