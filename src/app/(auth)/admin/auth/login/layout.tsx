"use client";
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "@/app/(client)/reducers";

const store = createStore(allReducers);

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}


