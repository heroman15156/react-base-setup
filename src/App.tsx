import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootRoutes from "./routes/RootRoutes.tsx";
import Header from "./components/Header.tsx";

import { useInitAuth } from "./hooks/useInitAuth.ts";
import { useAuthExpired } from "./hooks/useAuthExpired.tsx";

function App() {
  useInitAuth();
  useAuthExpired();
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
