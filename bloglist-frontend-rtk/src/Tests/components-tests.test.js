import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Blog from "../components/Blog";
import CreateBlog from "../components/CreateBlog";
import userEvent from "@testing-library/user-event";

describe("Blog components ", () => {
  // Make a test, which checks that the component displaying a blog renders the blog's title and author, but does not render its URL or number of likes by default.
  test("renders the title and author shown intaially without url and likes", async () => {
    const blog = {
      author: "Harshit Ji chatriwale",
      likes: 1000,
      title: "How to create an umbrella brand",
      url: "https://www.worldwidechatri.com",
    };
    render(<Blog blog={blog} />);

    const titleElement = screen.getByTestId("title");
    const authorElement = screen.getByTestId("author");

    expect(titleElement.textContent).toEqual("How to create an umbrella brand");
    expect(authorElement.textContent).toEqual("Harshit Ji chatriwale");

    const urlElement = screen.queryByText("https://www.worldwidechatri.com");
    const likesElement = screen.queryByText("1000 likes");
    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });

  // Make a test, which checks that the blog's URL and number of likes are shown when the button controlling the shown details has been clicked.
  test("url and likes are shown after clicking view", async () => {
    const blog = {
      author: "Harshit Ji chatriwale",
      likes: 1000,
      title: "How to create an umbrella brand",
      url: "https://www.worldwidechatri.com",
    };
    render(<Blog blog={blog} />);
    const user = userEvent.setup();
    const button = screen.getByTestId("view");
    await user.click(button);

    const titleElement = screen.getByTestId("title");
    expect(titleElement.textContent).toEqual("How to create an umbrella brand");

    const authorElement = screen.getByTestId("author");
    expect(authorElement.textContent).toEqual("Harshit Ji chatriwale");

    const urlElement = screen.getByTestId("url");
    expect(urlElement.textContent).toEqual("https://www.worldwidechatri.com");

    const likesElement = screen.getByTestId("likes");
    expect(likesElement.textContent).toEqual("1000 likes");
  });
});

describe("click like button", () => {
  // Make a test, which ensures that if the like button is clicked twice, the event handler the component received as props is called twice.
  test("Like button is in sync with the event handle function ", async () => {
    const blog = {
      author: "Harshit Ji chatriwale",
      likes: 1000,
      title: "How to create an umbrella brand",
      url: "https://www.worldwidechatri.com",
    };
    const onChange = jest.fn();
    const user = userEvent.setup();

    render(<Blog blog={blog} handleLike={onChange} />);
    const viewButton = screen.getByTestId("view");
    await user.click(viewButton);
    const likeButton = screen.getByTestId("like");
    await user.click(likeButton);
    await user.click(likeButton);
    expect(onChange).toHaveBeenCalledTimes(2);
  });
});

// Make a test for the new blog form. The test should check, that the form calls the event handler it received as props with the right details when a new blog is created.

describe("Create Blog component", () => {
  test("calls event handle with the right details on form submission", async () => {
    const mockSetBlog = jest.fn();
    const mockHandleBlog = jest.fn();
    const blog={
      title:"",
      url:"",
      author:""
    }

    render(
      <CreateBlog
        setBlog={mockSetBlog}
        handleBlog={mockHandleBlog}
        blog={blog}
      />
    );
    const user = userEvent.setup();
    await user.click(screen.getByTestId('create-blog'));
    
    user.type(screen.getByPlaceholderText('title'),'How to create an umbrella brand');
    user.type(screen.getByPlaceholderText('author'),'Harshit Ji chatriwale');
    user.type(screen.getByPlaceholderText('url'),'https://www.worldwidechatri.com');

    await user.click(screen.getByTestId("create"));
   
    expect(mockHandleBlog).toHaveBeenCalled();
    
    });
});
