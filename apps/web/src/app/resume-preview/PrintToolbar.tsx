"use client";

export default function PrintToolbar() {
  return (
    <div className="print-toolbar">
      <button onClick={() => window.print()}>⌘P · 打印 / 导出 PDF</button>
    </div>
  );
}
