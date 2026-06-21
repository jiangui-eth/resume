import type { Metadata } from "next";
import PrintToolbar from "./PrintToolbar";
import ResumePage1 from "./ResumePage1";
import ResumePage2 from "./ResumePage2";

export const metadata: Metadata = {
  title: "Resume Preview | jiangui.eth",
  robots: { index: false, follow: false },
};

export default function ResumePreviewPage() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div
        style={{
          background: "#e8e6dd",
          padding: "80px 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "18px",
          minHeight: "100vh",
        }}
      >
        <ResumePage1 />
        <ResumePage2 />
        <PrintToolbar />
      </div>
    </>
  );
}
