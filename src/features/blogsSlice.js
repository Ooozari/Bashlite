import { createSlice, nanoid } from "@reduxjs/toolkit";
import { loadFromLocalStorage } from "@/libs/storage";


const defaultState = {
    blogs: [{
        id: "1",
        title: "Simple Habits That Can Change Your Life",
        content: "Small daily habits can have a big impact on your overall well-being. From managing time better to improving mental health, every step counts. Learn easy strategies to stay motivated and productive. Incorporate these habits gradually for lasting results. Transform your routine and see noticeable positive changes in your life.",
        excerpt: "Small daily habits can have a big impact on your overall well-being. From managing time better to improving mental health, every step counts. Learn easy strategies to stay motivated and productive. Incorporate these habits gradually for lasting results. Transform your routine and see noticeable positive changes in your life.".slice(0, 200) + "...",
        author: "Guest",
        publishedDate: "2020-10-10",
    }]
};
// ✅ hydrate directly from localStorage at startup
const initialState = loadFromLocalStorage("userBlogs", defaultState);


// SLices

export const blogsSlice = createSlice({
    name: "userBlogs",
    initialState,
    // list of reducers
    reducers: {
        addBlog: (state, action) => {
            const blog = {
                id: nanoid(),
                title: action.payload.title,
                content: action.payload.content,
                author: action.payload.author,
                excerpt: action.payload.content.slice(0, 200) + "...",
                publishedDate: new Date().toISOString(),
            }
            state.blogs.push(blog)
        },
        updateBlog: (state, action) => {
            const blog = state.blogs.find((blog) => (blog.id === action.payload))
            if (blog) {
                blog.title = action.payload.title
                blog.content = action.payload.content
                blog.excerpt = action.payload.content.slice(0, 200) + "..."
                blog.publishedDate = new Date().toISOString()
            }
        },
        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => (blog.id !== action.payload))
        }
    }
})

export const {
    addBlog,
    updateBlog,
    deleteBlog,
} = blogsSlice.actions;

export default blogsSlice.reducer;