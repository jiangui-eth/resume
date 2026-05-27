import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqBotWidget } from "../FaqBotWidget";

// ── Mocks ─────────────────────────────────────────────────────────────────

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => <img {...props} />,
}));

vi.mock("@/lib/analytics", () => ({
  trackEvent: vi.fn(),
}));

// Mock useFaqBot so the widget renders without real API calls
const mockSendMessage = vi.fn();
const mockClearHistory = vi.fn();

vi.mock("@/hooks/useFaqBot", () => ({
  useFaqBot: () => ({
    messages: [],
    isLoading: false,
    error: null,
    sendMessage: mockSendMessage,
    clearHistory: mockClearHistory,
  }),
}));

beforeEach(() => {
  vi.clearAllMocks();
});

describe("FaqBotWidget", () => {
  it("renders the floating action button", () => {
    render(<FaqBotWidget />);
    expect(
      screen.getByRole("button", { name: /open otc faq bot/i })
    ).toBeInTheDocument();
  });

  it("chat panel is hidden by default", () => {
    render(<FaqBotWidget />);
    // The panel has aria-hidden=true when closed
    const panel = document.querySelector("[aria-hidden='true']");
    expect(panel).toBeInTheDocument();
  });

  it("opens chat panel on FAB click", () => {
    render(<FaqBotWidget />);
    const fab = screen.getByRole("button", { name: /open otc faq bot/i });
    fireEvent.click(fab);
    // After opening, FAB aria-label changes
    expect(
      screen.getByRole("button", { name: /close otc faq bot/i })
    ).toBeInTheDocument();
  });

  it("closes chat panel on close button click", () => {
    render(<FaqBotWidget />);
    // Open first
    fireEvent.click(screen.getByRole("button", { name: /open otc faq bot/i }));
    // Close via ✕ button in header
    const closeBtn = screen.getByRole("button", { name: /close/i });
    fireEvent.click(closeBtn);
    expect(
      screen.getByRole("button", { name: /open otc faq bot/i })
    ).toBeInTheDocument();
  });

  it("shows RAG stack badge in open state", () => {
    render(<FaqBotWidget />);
    fireEvent.click(screen.getByRole("button", { name: /open otc faq bot/i }));
    expect(screen.getByText(/pgvector \+ BM25 \+ Cohere Rerank/i)).toBeInTheDocument();
  });

  it("calls sendMessage when user submits a query", () => {
    render(<FaqBotWidget />);
    fireEvent.click(screen.getByRole("button", { name: /open otc faq bot/i }));

    const input = screen.getByPlaceholderText(/ask about otc trading/i);
    fireEvent.change(input, { target: { value: "What is OTC?" } });
    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockSendMessage).toHaveBeenCalledWith("What is OTC?");
  });

  it("send button is disabled when input is empty", () => {
    render(<FaqBotWidget />);
    fireEvent.click(screen.getByRole("button", { name: /open otc faq bot/i }));
    const sendBtn = screen.getByRole("button", { name: /send message/i });
    expect(sendBtn).toBeDisabled();
  });
});
