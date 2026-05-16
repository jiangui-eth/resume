"use client";

export default function PrintButton() {
  return (
    <div className="print-toolbar">
      <button onClick={() => window.print()}>⌘P · 打印 / 导出 PDF</button>
    </div>
  );
}
