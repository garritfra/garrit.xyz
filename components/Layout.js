import { useState, useLayoutEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Meta from "./Meta";

export default function Layout({
  siteTitle,
  siteDescription,
  children,
}) {
  return (
    <section className={`layout`}>
      <Meta siteTitle={siteTitle} siteDescription={siteDescription} />
      <Header siteTitle={siteTitle} />
      <div className="content">{children}</div>
      <Footer />
      <style jsx>
        {`
          .layout {
            overflow-x: hidden;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
          }
          .layout .info_page {
            color: #ebebeb;
          }
          .content {
          }
          @media (min-width: 768px) {
          }
        `}
      </style>
    </section>
  );
}
