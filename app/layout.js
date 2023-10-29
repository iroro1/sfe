"use client";
import React from "react";
import { store } from "../store";
// import { Inter } from "next/font/google";
import { Provider } from "react-redux";
import "./globals.css";
// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
