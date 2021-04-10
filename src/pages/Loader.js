import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import VideoLoader from "../components/VideoLoader";
import { FaceapiContext } from "../context/faceapi/FaceapiContext";
const Loader = () => {
  const { modulesLoaded, loadModules } = useContext(FaceapiContext);
  const history = useHistory();

  useEffect(() => {
    const load = async () => {
      if (modulesLoaded === false) {
        await loadModules();
      }
    };
    load();
    return () => {
      history.push("/manageFamily");
    };
  }, [history, loadModules, modulesLoaded]);
  return <VideoLoader />;
};
export default Loader;
