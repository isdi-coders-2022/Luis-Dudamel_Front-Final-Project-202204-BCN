import jwtDecode from "jwt-decode";
import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import CredentialsValidation from "./components/CredentialsValidation/CredentialsValidation";
import { NavBar } from "./components/NavBar/Navbar";
import CreatePage from "./pages/CreatePage/CreatePage";
import EditPage from "./pages/EditPage/EditPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import MyDogsPage from "./pages/MyDogsPage/MyDogsPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { loadFavDogsActionCreator } from "./redux/feature/dogsSlice";
import { loginUserActionCreator } from "./redux/feature/usersSlice";
import { useAppDispatch } from "./redux/hooks";
import { getFavDogsThunk } from "./redux/thunks/dogsThunks";

function App(): JSX.Element {
  const token = localStorage.getItem("token");
  const dispatch = useAppDispatch();

  try {
    const userData = jwtDecode<any>(token as string);
    dispatch(
      loginUserActionCreator({
        name: userData.name,
        username: userData.username,
        id: userData.id,
        logged: true,
      })
    );
    dispatch(getFavDogsThunk(userData.username));
  } catch (error) {}

  const { pathname } = useLocation();

  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route
          path="/edit/:id"
          element={
            <CredentialsValidation>
              <EditPage />
            </CredentialsValidation>
          }
        />
        <Route
          path="/profile"
          element={
            <CredentialsValidation>
              <MyDogsPage />
            </CredentialsValidation>
          }
        />
      </Routes>
      {pathname !== "/login" && pathname !== "/register" && <NavBar />}
    </>
  );
}

export default App;
