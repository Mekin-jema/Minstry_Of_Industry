import { Button } from "flowbite-react";
import { AiFillFacebook, AiFillGoogleCircle } from "react-icons/ai";
// import { app } from "../Firebase";
// import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
// import { useDispatch } from "react-redux";
// import { signinSuccess } from "../Redux/userSlice";

const OAuth = () => {
  //   const dispatch = useDispatch();
  const handleGoogleClick = async () => {
    try {
      //   const provider = new GoogleAuthProvider();
      //   const auth = getAuth(app);
      //   const result = await signInWithPopup(auth, provider);
      //   const res = await fetch("/api/auth/google", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: result.user.displayName,
      //       email: result.user.email,
      //       photo: result.user.photoURL,
      //     }),
      //   });
      //   console.log(res);
      //   const data = await res.json();
      //   dispatch(signinSuccess(data));
    } catch (error) {
      console.log(error);
      console.log("could not sign in with google");
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#214394] hover:bg-[#264da8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 "
    >
      <AiFillGoogleCircle className=" w-6 h-6 mr-2 text-white" />
      <AiFillFacebook className=" w-6 h-6 mr-2  text-white  " />
    </button>
  );
};

export default OAuth;