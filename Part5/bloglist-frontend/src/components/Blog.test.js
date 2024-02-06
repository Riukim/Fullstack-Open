import React from "react"
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Blog from "./Blog"

describe("Blog component", () => {
  const blog = {
    title: "Test Title",
    author: "Test Author",
    likes: 1000,
    url: "test.com",
    user: { name: "Test User" }
  }

  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    component = render(<Blog key={blog.id} blog={blog} updateBlog={mockHandler}/>)
  })

  test("renders Title and Author, but not URL or number of likes by default", () => {

    expect(component.container.querySelector(".title")).toHaveTextContent(blog.title)

    expect(component.container.querySelector(".author")).toHaveTextContent(blog.author)

    expect(component.queryByText(blog.url)).not.toBeInTheDocument()
    expect(component.queryByText(blog.likes)).not.toBeInTheDocument()
  })

  test("Blog's URL and number of likes are shown when the view button is clicked", () => {

    const button = component.getByText("view")

    fireEvent.click(button)

    const blogUrl = component.container.querySelector(".blogURL")
    expect(blogUrl).toBeInTheDocument()
    const blogLikes = component.container.querySelector(".blogLikes")
    expect(blogLikes).toBeInTheDocument()
  })

  test("If the like button is clicked twice the event handler is called twice", async () => {

    const button = component.getByText("view")
    userEvent.click(button)

    const likeButton = component.getByText("Add Like")
    await userEvent.click(likeButton)
    await userEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})
