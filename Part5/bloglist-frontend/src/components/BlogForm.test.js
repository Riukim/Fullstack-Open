import React from "react"
import "@testing-library/jest-dom"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import BlogForm from "./BlogForm"

describe("Blog Form component", () => {
  test("<BlogForm /> updates parent state and calls onSubmit", async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    const component = render(<BlogForm createBlog={createBlog}/>)

    const titleInput = component.container.querySelector("input[name=\"title\"]")
    const authorInput = component.container.querySelector("input[name=\"author\"]")
    const urlInput = component.container.querySelector("input[name=\"url\"]")
    const sendButton = screen.getByText("create")

    await user.type(titleInput, "testTitle")
    await user.type(authorInput, "testAuthor")
    await user.type(urlInput, "test.com")
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toEqual({
      title: "testTitle",
      author: "testAuthor",
      url: "test.com"
    })
  })
})