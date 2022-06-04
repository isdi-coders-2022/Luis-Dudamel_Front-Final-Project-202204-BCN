import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import MyDogsPageStyled from "./MyDogsPageStyled";
import { Dog } from "../../interfaces/Dogs";
import { getFavDogsThunk } from "../../redux/thunks/dogsThunks";
import { useEffect } from "react";
import { UserState } from "../../interfaces/UserCredential";
import { DogList } from "../../components/DogList/DogList";
import { Stack } from "@mui/material";
import LoginForm from "../../components/LoginForm/LoginForm";

const MyDogsPage = (): JSX.Element => {
  const currentFavDogs: Dog[] = useAppSelector((state) => state.dogs);
  const currentUser: UserState = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavDogsThunk(currentUser.username));
  }, [currentUser.username, dispatch]);

  return (
    <>
      <MyDogsPageStyled>
        <Stack
          mt={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
        >
          <h1>My dogs</h1>
          <DogList dogs={currentFavDogs}></DogList>
        </Stack>
      </MyDogsPageStyled>
    </>
  );
};

export default MyDogsPage;
