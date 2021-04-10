import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import ImageProvider from "./context/images/ImagesProvider";
import FamilyProvider from "./context/family/FamilyProvider";
import FaceapiProvider from "./context/faceapi/FaceapiProvider";
import AlbumCrud from "./pages/AlbumCrud";
import Loader from "./pages/Loader";
import ManageFamily from "./pages/ManageFamily";
import Header from "./pages/Header";
function App() {
  return (
    <FamilyProvider>
      <ImageProvider>
        <FaceapiProvider>
          <BrowserRouter>
            <Route path="/">
              <Header />
            </Route>
            <Route exact path="/">
              <Loader />
            </Route>
            <Route exact path="/manageFamily">
              <ManageFamily />
            </Route>
            <Route exact path="/albums/:label">
              <AlbumCrud />
            </Route>
          </BrowserRouter>
        </FaceapiProvider>
      </ImageProvider>
    </FamilyProvider>
  );
}

export default App;
