import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //load the authenticated user
  const { isLoading, isAuthenticated, isFetching } = useUser();
  //if no authenticated user, redirect to login
  //navigate function is either by user action or in use effect
  useEffect(() => {
    //I choose isFetching because isLoading
    //is always false after the first fetch
    if (!isAuthenticated && !isFetching) navigate("/login");
  }, [isAuthenticated, navigate, isFetching]);

  //while loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  //if there is authenticated user, load app
  if (isAuthenticated) return children;
}
export default ProtectedRoute;
