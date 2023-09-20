import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import SetsDataProvider from "~/context/SetsContext";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps },
}) => {
  return (
    <ClerkProvider>
      <SetsDataProvider>
            <Toaster />
            <Component {...pageProps} />
      </SetsDataProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
