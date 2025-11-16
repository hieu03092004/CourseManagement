"use client";
// src/app/(client)/layout.tsx

import { Provider } from "react-redux";
import { createStore } from "redux";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import allReducers from "./reducers";

const store = createStore(allReducers);

export default function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Provider store={store}>
      {/* Header cố định của client */}
      <Header />

      {/* Nếu Header fixed height ~82px thì padding top để tránh đè */}
      <main className="pt-[82px] min-h-dvh">{children}</main>

      <Footer />
    </Provider>
  );
}
