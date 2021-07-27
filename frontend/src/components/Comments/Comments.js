import * as React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";
import "./Comments.css";
import Navbar from "../Navbar/Navbar";

export default function Comments() {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const fetchCommentsById = async () => {
      setIsLoading(true);
      try {
        const { data } = await apiClient.listCommentsWithPostId(postId);
        console.log(data);
        setComments(data.comments);
      } catch (err) {
        setError(err);
      }

      setIsLoading(false);
    };
    fetchCommentsById();
  }, [postId]);

  const groupComments = (commentDetails) => {
    // get an array of unique comment ids
    const commentIds = [...new Set(commentDetails.map((d) => d.commentId))];
  };

  //in return(), would we then return commentIds?

  const commentsMapping = groupComments(comments);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => alert(JSON.stringify(data));
  return (
    <div className="comments">
      <div className="title">
        <h2>Comments</h2>
      </div>

      <form
        onSubmit={handleSubmit(
          async (data) => await apiClient.createComment(postId, data)
        )}
      >
        {/* {
              comment: data,
              postId: postId,
            } */}

        <input
          type="text"
          placeholder="Comments"
          {...register("Comments", {})}
        />

        <input type="submit" />
      </form>

      {/* {Object.keys(commentsMapping).map((commentId) => ( */}
      {comments.map((comment) => (
        <div className="commentSection">
          <div className="user">
            <div className="profilePic">
              <img
                className="profileImg"
                src={comment.profile_img_url}
                alt="user profile picture"
              />
            </div>
            <div className="username">
              <p>{comment.username}</p>
            </div>
          </div>
          <div className="description">
            <p>{comment.comment_description}</p>
          </div>
        </div>
      ))}
      {/* ))} 
      key={comment.id}
      Name: {comment}
      */}
    </div>
  );
}

// import React from "react";

// class MyForm extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { username: "" };
//   }
//   myChangeHandler = (event) => {
//     this.setState({ username: event.target.value });
//   };
//   render() {
//     return (
//       <form>
//         <h1>Hello {this.state.username}</h1>
//         <p>Comments:</p>
//         <input type="text" onChange={this.myChangeHandler} />
//       </form>
//     );
//   }
// }

// export default MyForm;