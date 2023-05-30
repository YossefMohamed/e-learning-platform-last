import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "../../layouts/MainLayout";
import { Header } from "../components/Header";
import Footer from "../components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import Auth from "@/components/Auth";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import React from "react";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 3,
      retryDelay: 8000,  
    },
    mutations: {
      retry: false,
      retryDelay: 50000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Auth>
            <Header />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="duration-100	flex-1">
              <Component {...pageProps} />
            </div>
            <Footer />
          </Auth>
        </QueryClientProvider>
      </Provider>
    </Layout>
  );
}
