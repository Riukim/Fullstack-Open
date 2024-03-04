import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter, Link } from "react-router-dom"
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import store from "../store"

import Blog from "./Blog"

describe("Blog", () => {
  const blog = {
    title: "Goto considered harmful",
    author: "Edsger Dijkstra",
    url: "google.com",
    likes: 1,
    id: 1
  }

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Blog
            key={blog.id}
            blog={blog}
            canRemove={true}
          />
        </BrowserRouter>
      </Provider>
    )
  })

  test("renders only title and author by default", () => {
    screen.getByText(blog.title, { exact: false })
    screen.getByText(blog.author, { exact: false })

    const ulrElement = screen.queryByText(blog.url, { exact: false })
    expect(ulrElement).toBeNull()

    const likesElement = screen.queryByText("likes", { exact: false })
    expect(likesElement).toBeNull()
  })
})