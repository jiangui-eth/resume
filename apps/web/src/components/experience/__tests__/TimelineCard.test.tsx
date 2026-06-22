import type { Experience } from "@/types/experience";
import { screen } from "@testing-library/react";
import React from "react";
import { describe, expect, it } from "vitest";

import { renderWithIntl } from "@/test/intl-test-utils";
import TimelineCard from "../TimelineCard";

const mockExperience: Experience = {
  id: "test-001",
  company: "TestCo",
  companyUrl: "https://testco.com",
  title: "Senior Engineer",
  type: "full-time",
  period: { start: "2022-01", end: "present" },
  location: "Remote",
  responsibilities: ["Built the platform", "Shipped new features"],
  techTags: ["React", "TypeScript"],
  highlight: "2x faster",
};

const pastExperience: Experience = {
  id: "test-002",
  company: "PastCo",
  title: "Engineer",
  type: "full-time",
  period: { start: "2020-01", end: "2022-01" },
  location: "Shanghai",
  responsibilities: ["Maintained services"],
  techTags: ["Go"],
};

describe("timelineCard", () => {
  it("renders the role title", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    expect(screen.getByText("Senior Engineer")).toBeInTheDocument();
  });

  it("renders bullet points from the responsibilities array", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    expect(screen.getByText("Built the platform")).toBeInTheDocument();
    expect(screen.getByText("Shipped new features")).toBeInTheDocument();
  });

  it("renders tech tags with bg-white/5 class", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    const tag = screen.getByText("React");
    expect(tag.className).toContain("bg-white/5");
  });

  it("renders the highlight badge", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    expect(screen.getByText("2x faster")).toBeInTheDocument();
  });

  it("with side=left, outer wrapper has md:flex-row class (card on right)", () => {
    const { container } = renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("md:flex-row");
    expect(wrapper.className).not.toContain("md:flex-row-reverse");
  });

  it("with side=right, outer wrapper has md:flex-row-reverse class (card on left)", () => {
    const { container } = renderWithIntl(
      <TimelineCard experience={mockExperience} index={1} side="right" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("md:flex-row-reverse");
  });

  it("renders Material Symbols icon spans for each bullet", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    const icons = document.querySelectorAll(".material-symbols-outlined");
    expect(icons.length).toBeGreaterThanOrEqual(
      mockExperience.responsibilities.length,
    );
  });

  it("renders 至今 label for active positions", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    expect(screen.getAllByText("至今").length).toBeGreaterThanOrEqual(1);
  });

  it("renders formatted end date for past positions (zh-CN locale)", () => {
    renderWithIntl(
      <TimelineCard experience={pastExperience} index={0} side="left" />,
    );
    expect(screen.getAllByText(/2022年1月/).length).toBeGreaterThanOrEqual(1);
  });

  it("renders company as a link when companyUrl is provided", () => {
    renderWithIntl(
      <TimelineCard experience={mockExperience} index={0} side="left" />,
    );
    const link = screen.getByRole("link", { name: "TestCo" });
    expect(link).toHaveAttribute("href", "https://testco.com");
  });

  it("renders company as plain text when no companyUrl", () => {
    renderWithIntl(
      <TimelineCard experience={pastExperience} index={0} side="left" />,
    );
    expect(screen.queryByRole("link", { name: "PastCo" })).toBeNull();
    expect(screen.getAllByText("PastCo").length).toBeGreaterThanOrEqual(1);
  });
});
