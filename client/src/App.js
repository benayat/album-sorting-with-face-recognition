import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import ImageProvider from "./context/images/ImagesProvider";
import FamilyProvider from "./context/family/FamilyProvider";
import FaceapiProvider from "./context/faceapi/FaceapiProvider";
import AlbumCrud from "./pages/AlbumCrud";
import SignUp from "./pages/SignUp";
import ManageFamily from "./pages/ManageFamily";
import Header from "./pages/Header";
import Login from "./pages/Login";
function App() {
  return (
    <FamilyProvider>
      <ImageProvider>
        <FaceapiProvider>
          <BrowserRouter>
            <Route path="/">
              <Header />
            </Route>
            {/* <Route exact path="/">
              <SignUp />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route> */}
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
