import React from "react"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

test("renders Title and Author, but not URL or number of likes by default", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    likes: 1000,
    url: "test.com",
    user: { name: "Test User" }
  }

  render(<Blog blog={blog} />)

  const titleElement = screen.getByText("Title:")
  const authorElement = screen.getByText("Author:")
  const urlElement = screen.queryByText("URL:")
  const likesElement = screen.queryByText("Likes:")

  screen.debug()

  expect(titleElement).toBeInTheDocument()
  expect(authorElement).toBeInTheDocument()
  expect(urlElement).toBeInTheDocument()
  expect(likesElement).toBeInTheDocument()
})
