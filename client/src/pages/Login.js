import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import WebcamCapture from "../components/webcamTest/WebcamComponent";
import { FaceapiContext } from "../context/faceapi/FaceapiContext";
import { signUpInterface } from "../utils/idbStores/familyMembers";
const Login = async () => {
  const [authenticattionResult, setAuthenticationResult] = useState(null);
  const history = useHistory();
  const { getDescriptor } = signUpInterface;
  const { getDetectionResult, getSingleDescriptor } = FaceapiContext;

  const authenticate = async (name, src) => {
    const originalDescriptor = await getDescriptor(name);
    const descriptorToAuthenticate = getSingleDescriptor(name, src);
    const result = getDetectionResult(
      originalDescriptor,
      descriptorToAuthenticate
    );
    if (result !== null && result === true) {
      setAuthenticationResult(true);
      prompt(`wellcome ${name}!`);
    } else if (result != null && result === false) {
      prompt("please try again");
      history.push("/login");
    }
  };

  useEffect(() => {
    if (authenticattionResult && authenticattionResult === true) {
      history.push("/manageFamily");
    } else if (authenticattionResult && authenticattionResult === false) {
      history.push("/login");
    }
  }, [history, authenticattionResult]);
  return <WebcamCapture onCapture={authenticate} />;
};
export default Login;
