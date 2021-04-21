import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import WebcamCapture from "../components/webcamTest/WebcamComponent";
import { FaceapiContext } from "../context/faceapi/FaceapiContext";
import { signUpInterface } from "../utils/idbStores/familyMembers";
const SignUp = () => {
  const { getSingleDescriptor } = useContext(FaceapiContext);
  const history = useHistory();
  const { set } = signUpInterface;
  const [loginAuthenticationBool, setLoginAuthenticationBool] = useState(false);

  const onCaptureSignUp = async (name, src) => {
    const descriptor = await getSingleDescriptor(name, src);
    await set({ userName: name, src, descriptor });
    setLoginAuthenticationBool(true);
  };
  useEffect(() => {
    if (loginAuthenticationBool === true) {
      history.push("/login");
    }
  }, [loginAuthenticationBool, history]);
  return (
    <div>
      <p>
        welcome to album-sorter! <br /> please take a clear picture of your
        face:
      </p>
      <WebcamCapture onCapture={onCaptureSignUp} />
    </div>
  );
};
export default SignUp;
