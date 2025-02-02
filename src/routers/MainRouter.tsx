import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Conpaniys, SignIn, SignUp } from "../modules";
import { Paths } from "./paths";
import { LoginLayout } from "../layouts";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element={<Conpaniys />} />
      <Route path={Paths.AUTH} element={<LoginLayout />} >
        <Route path={Paths.SIGN_IN} element={<SignIn />} />
        <Route path={Paths.SIGN_UP} element={<SignUp />} />
      </Route>
    </Route>
  )
);
const MainRouter = () => {

  return <RouterProvider router={router} />;
};

export default MainRouter;