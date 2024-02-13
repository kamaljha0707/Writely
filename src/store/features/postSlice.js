import { createSlice , createAsyncThunk, asyncThunkCreator } from "@reduxjs/toolkit";
import dbService from "../../appwrite/db";



export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
     return dbService.getAllPost()
    }
  );
export const fetchPost = createAsyncThunk(
    'posts/fetchPost',
    async () => {
     return dbService.getPost(slug)
    }
  );
export const addPost = createAsyncThunk(
    'posts/addPost',
    async ({title, content, featuredImage, status, username, userId, date}) => {
     return dbService.createPost({title,
         content,
          featuredImage,
           status,
            username, 
            userId,
             date})
    }
  );
export const removePost = createAsyncThunk(
    'posts/removePost',
    async (slug) => {
     return dbService.deletePost(slug)
    }
  );
export const updateExistingPost  = createAsyncThunk(
    'posts/updatePost',
    async ( slug, {title, content, featuredImage, status}) => {
     return dbService.updatePost( slug, {title, content, featuredImage, status})
    }
  );
export const uploadPostFile  = createAsyncThunk(
    'posts/updateFile',
    async (file) => {
     return dbService.uploadFile(file)
    }
  );
export const deletePostFile  = createAsyncThunk(
    'posts/deleteFile',
    async (fileId) => {
     return dbService.deleteFile(fileId)
    }
  );



  const initialState = {
    posts: [],
    post: null,
    isLoading: false,
    error: null
  };

  const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Reducer for fetchPosts
      builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })

      // Reducer for fetchSinglePost
      .addCase(fetchPost.pending, (state)=>{
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPost.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.post = action.payload
      })
      .addCase(fetchPost.rejected, (state,action)=>{
        state.isLoading = false;
        state.error = action.error.message;
     })

      // Reducer for updateExistingPost
      .addCase(updateExistingPost.pending, (state)=>{
         state.isLoading = true;
         state.error = null;
      })
     .addCase(updateExistingPost.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.posts = state.posts.map(post =>{
            (post.id === action.payload.id ? action.payload : post);
        })
     })
     .addCase(updateExistingPost.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.error.message;
     })
      // Reducer for addPost
      .addCase(addPost.pending, (state)=>{
        state.isLoading = true;
        state.error = null
      })
      .addCase(addPost.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      
      .addCase(addPost.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Reducer for removePost
      .addCase(removePost.pending, (state)=>{
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removePost.fulfilled, (state, action)=>{
        state.isLoading = false;
        state.posts = state.posts.filter(post => post.id !== action.payload)
      })
      .addCase(removePost.rejected, (state, action)=>{
        state.isLoading = false;
        state.error = action.error.message;
      })
      // Reducer for uploadPostFile
      .addCase(uploadPostFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(uploadPostFile.fulfilled,(state, action) => {
        state.isLoading = false;
      })
      .addCase(uploadPostFile.rejected,(state, action) => {
        state.isLoading = false
        state.error = action.error.message;
      })

      // Reducer for deletePostFile
      .addCase(deletePostFile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePostFile.fulfilled,(state) => {
        state.isLoading = false;
      })
      .addCase(deletePostFile.rejected,(state,action) => {
        state.isLoading = false;
        state.error = action.payload.message;
      })


    }
  });

  export const postsActions = {
    ...postsSlice.actions,
    fetchPosts,
    fetchPost,
    removePost,
    addPost,
    updateExistingPost,
    uploadPostFile,
    deletePostFile
  };

  export default postsSlice.reducer;