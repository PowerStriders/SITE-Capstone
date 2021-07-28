import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../services/apiClient";

export const useEditProfile = ({ user }) => {
  const navigate = useNavigate();
  function joinName(fName, lName) {
    return fName + " " + lName;
  }
  // console.log(user.first_name);
  const my_name = joinName(user.first_name, user.last_name) || "";
  // console.log("name " + my_name);
  const instagram_url = user.instagram_url || "";
  const profile_img_url = user.profile_img_url || "";
  const facebook_url = user.facebook_url || "";
  const twitter_url = user.twitter_url || "";
  const username = user.username || "";
  const banner_img_url = user.banner_img_url || "";
  const biography = user.biography || "";
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: my_name,
    userName: username,
    profileImgUrl: profile_img_url,
    bannerImgUrl: banner_img_url,
    instagramUrl: instagram_url,
    facebookUrl: facebook_url,
    twitterUrl: twitter_url,
    biography: biography,
  });

  // useEffect(() => {
  //   // if user is already logged in,
  //   // redirect them to the home page
  //   if (user?.email) {
  //     navigate("/");
  //   }
  // }, [user, navigate]);

  const handleOnInputChange = (event) => {
    setForm((f) => ({ ...f, [event.target.name]: event.target.value }));
  };

  const handleOnSubmit = async () => {
    setIsProcessing(true);
    setErrors((e) => ({ ...e, form: null }));

    function splitName(name) {
      let arr = [];
      let index = name.indexOf(" "); // Gets the first index where a space occurs
      let fName = name.substr(0, index); // Gets the first part
      let lName = name.substr(index + 1); // Gets the second part
      arr[0] = fName;
      arr[1] = lName;
      return arr;
    }

    const myArr = splitName(form.name);
    const { data, error } = await apiClient.updateUser({
      first_name: myArr[0],
      last_name: myArr[1],
      username: form.userName,
      email: user.email,
      profile_img_url: form.profileImgUrl,
      banner_img_url: form.bannerImgUrl,
      instagram_url: form.instagramUrl,
      facebook_url: form.facebookUrl,
      twitter_url: form.twitterUrl,
      biography: form.biography,
    });
    if (error) setErrors((e) => ({ ...e, form: error }));
    // if (data?.user) {
    //   setUser(data.user);
    //   apiClient.setToken(data.token);
    // }
    setIsProcessing(false);
  };

  return {
    isProcessing,
    form,
    errors,
    handleOnSubmit,
    handleOnInputChange,
  };
};