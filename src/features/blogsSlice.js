import { createSlice, nanoid } from "@reduxjs/toolkit";

const defaultState = {
    blogs: [{
        id: "apaoUOncY09BInCZ",
        title: "Simple Habits That Can Change Your Life",
        content: "Small daily habits can have a big impact on your overall well-being. From managing time better to improving mental health, every step counts. Learn easy strategies to stay motivated and productive. Incorporate these habits gradually for lasting results. Transform your routine and see noticeable positive changes in your life.",
        excerpt: "Small daily habits can have a big impact on your overall well-being. From managing time better to improving mental health, every step counts. Learn easy strategies to stay motivated and productive. Incorporate these habits gradually for lasting results. Transform your routine and see noticeable positive changes in your life.".slice(0, 200) + "...",
        author: "Guest",
        publishedDate: "2020-10-10",
    }],
};


const initialState = defaultState;


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
            const { id, title, content } = action.payload;
            const blog = state.blogs.find((blog) => blog.id === id);
            if (blog) {
                blog.title = title;
                blog.content = content;
                blog.excerpt = content.slice(0, 200) + "...";
                blog.publishedDate = new Date().toISOString();
            }
        },

        deleteBlog: (state, action) => {
            state.blogs = state.blogs.filter((blog) => (blog.id !== action.payload))
        },
        clearAllBlogs: (state) => {
            state.blogs = [];
        }
    }
})

export const {
    addBlog,
    updateBlog,
    deleteBlog,
    clearAllBlogs,
} = blogsSlice.actions;

export default blogsSlice.reducer;