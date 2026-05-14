import type { Metadata } from "next";
import PrintLayout from "@/components/print/PrintLayout";
import PrintButton from "@/components/print/PrintButton";

export const metadata: Metadata = {
  title: "Print Resume | jiangui.eth",
  description: "Printable A4 resume for Jiangui — Senior Full-Stack Engineer.",
  robots: { index: false, follow: false },
};

export default function PrintPage() {
  return (
    <>
      <PrintLayout />
      <div
        className="fixed bottom-6 right-6 z-50"
        data-print-hide=""
      >
        <PrintButton />
      </div>
    </>
  );
}
