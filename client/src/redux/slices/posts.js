import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchPosts = createAsyncThunk('posts/fetchPosts',async ()=>{
    const {data} = await axios.get("/posts");
    return data;

})

export const fetchTags = createAsyncThunk('posts/fetchTags',async ()=>{
    const {data} = await axios.get("/tags");
    return data;

})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost',async (id)=>  await axios.delete(`/posts/${id}`))

const initialState = {
    posts:{
        items:[],
        status: 'loading'
    },
    tags:{
        items:[],
        status:'loading',
    }

}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    extraReducers:{
        //Get posts
        [fetchPosts.pending]: (state,action)=>{
            state.posts.status = 'loading'
        },
        [fetchPosts.fulfilled]: (state,action)=>{
            state.posts.items  = action.payload;
            state.posts.status = 'loaded'
        },
        [fetchPosts.rejected]: (state,action)=>{
            state.posts.items  = [];
            state.posts.status = 'error';
        },

        //Get tags
        [fetchTags.pending]: (state,action)=>{
            state.tags.status = 'loading'
        },
        [fetchTags.fulfilled]: (state,action)=>{
            state.tags.items  = action.payload;
            state.tags.status = 'loaded'
        },
        [fetchTags.rejected]: (state,action)=>{
            state.tags.items  = [];
            state.tags.status = 'error';
        },

        //Remove post
        [fetchRemovePost.pending]: (state,action)=>{
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },

    }
})

export const postsReducer = postsSlice.reducer;