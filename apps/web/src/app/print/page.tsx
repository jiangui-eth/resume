import type { Metadata } from "next";
import PrintButton from "@/components/print/PrintButton";
import PrintLayout from "@/components/print/PrintLayout";

export const metadata: Metadata = {
  title: "Print Resume | jiangui.eth",
  description: "Printable A4 resume for Jiangui — Senior Full-Stack Engineer.",
  robots: { index: false, follow: false },
};

export default function PrintPage() {
  return (
    <>
      <PrintLayout />
      <div className="fixed right-6 bottom-6 z-50" data-print-hide="">
        <PrintButton />
      </div>
    </>
  );
}
