import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Header from "./components/Header.tsx";
import RootRoutes from "./routes/RootRoutes.tsx";
import { useAuth } from "./hooks/useAuth.ts";
import { useEffect } from "react";

function App() {
  const { refreshToken } = useAuth();

  useEffect(() => {
    refreshToken();
  }, []);

  return (
    <>
      <Header />
      <RootRoutes />
      {/*<UnsplashInfiniteScroll />*/}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
