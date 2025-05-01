// Handling page to the state or state management file [ slice ] !

// Handling operations that be on the post section

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// why we provide loading and error in every state structure ?
const initialState = {
    records: [], // that be as the data
    loading: false,
    error: null,
    record: null,
}

// First Method
// posts/fetchPosts -> this know as a [ type ] that used by react redux to enable providing [ Pending , Fulfilled , Rejected ] into this function [ fetchPosts ]

// _ as a payload and used when we needed to it as a payload or data
// _ this mean we not needed to use payload data in this case
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async(_,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const res  = await fetch("http://localhost:5000/posts");
        const data = await res.json(); // normal object to handle coming data.
        return data;
    } catch (error) {
        return rejectWithValue(error.message)
    }
} )

export const deletePost = createAsyncThunk("posts/deletePost", async(id,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;

    try {
        await fetch(`http://localhost:5000/posts/${id}`,{
            method:"DELETE"
        })
        return id;
    } catch (error) {
        return rejectWithValue(error.message)
    }
})

// posts/insertPost : this link exist on createSlice in post then insetPost 3 handling methods
export const insertPost = createAsyncThunk("posts/insertPost",async(item,thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI; // to return error message once happening
    const { auth } = getState(); // access to the initState in auth slice!
    item.userId = auth.id; //userId that be as new object that add rather than title and description on json-server data
    try {
        const res = await fetch("http://localhost:5000/posts",{
            method:"POST",
            body: JSON.stringify(item), //item here be as object
            headers:{
                "Content-Type":"application/json; charset=UTF-8",
            },
        });

        const newData = res.json();
        return newData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})

export const fetchPost = createAsyncThunk("posts/fetchPost",async(id,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const req = await fetch(`http://localhost:5000/posts/${id}`);
        const res = await req.json();
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

// "posts/editPost" -> As a type of this operation
// async ... -> As a payload also about this operation
export const editPost = createAsyncThunk("posts/editPost",async(item,thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
        const req = await fetch(`http://localhost:5000/posts/${item.id}`,{
            method:"PATCH",//to edit data, similar put method, and to see more info about the differences between them search about it!
            body: JSON.stringify(item),
            headers:{
                "Content-type":"application/json; charset=UTF-8",
            }
        });
        const res = await req.json();
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
    }
})


// createSlice that used to build main reducers
const postSlice = createSlice({
    name:"posts", // main slice name that represent section of store about data handling operation
    initialState,
    // main reducer
    reducers: {
        clearRecords: (state) => {
            state.record = null;
        }
    },
    extraReducers: (builder) => {
  // ─── [ Fetch All Posts ] ─────────────────────────
        builder
            .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
            state.loading = false;
            state.records = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });

        // ─── [ Delete Post ] ─────────────────────────────
        builder
            .addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
            state.loading = false;
            state.records = state.records.filter((record) => record.id !== action.payload);
            window.location.reload(); // Consider removing this for a cleaner state-based update
            })
            .addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });

        // ─── [ Insert Post ] ─────────────────────────────
        builder
            .addCase(insertPost.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(insertPost.fulfilled, (state, action) => {
            state.loading = false;
            state.records.push(action.payload);
            })
            .addCase(insertPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });

        // ─── [ Fetch Single Post ] ───────────────────────
        builder
            .addCase(fetchPost.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(fetchPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
            state.error = null;
            })
            .addCase(fetchPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });

        // ─── [ Edit Post ] ───────────────────────────────
        builder
            .addCase(editPost.pending, (state) => {
            state.loading = true;
            state.error = null;
            })
            .addCase(editPost.fulfilled, (state, action) => {
            state.loading = false;
            state.record = action.payload;
            state.error = null;
            })
            .addCase(editPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            });
        }

});

export const { clearRecords } = postSlice.actions;
export default postSlice.reducer;