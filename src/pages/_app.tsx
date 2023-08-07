import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../../layouts/MainLayout";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import Auth from "@/components/Auth";
import { Rootstate, store } from "@/redux/store";
import { Provider } from "react-redux";
import React from "react";
import { io } from "socket.io-client";
import useSocket from "@/custom-hooks/useSocket";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 8000,
      cacheTime: 0,
    },
    mutations: {
      retry: false,
      retryDelay: 50000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <div className="duration-100	flex-1  md:w-[80%] w-[100%]  m-auto min-h-screen flex flex-col ">
            <Header />
            <Auth>
              <Toaster position="top-center" reverseOrder={false} />
              <div className="flex-1">
                <Component {...pageProps} />
              </div>
            </Auth>

            <Footer />
          </div>
        </Layout>
      </QueryClientProvider>
    </Provider>
  );
}
