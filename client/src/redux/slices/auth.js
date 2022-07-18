import { createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../../axios"

export const fetchAuth = createAsyncThunk('auth/fetchUserData',async (params)=>{
    const {data} = await axios.post("/signin",params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe',async ()=>{
    const {data} = await axios.get("/profile");
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister',async (params)=>{
    const {data} = await axios.post("/signup",params);
    return data;
})




const initialState = {
    data: null,
    status:'loading',
}
const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        logout:(state)=> {
            state.data = null
        }
    },
    extraReducers:{
        [fetchAuth.pending]: (state,action)=>{
            state.data = null
            state.status = 'loading'

        },
        [fetchAuth.fulfilled]: (state,action)=>{
            state.data  = action.payload;
            state.status = 'loaded'


        },
        [fetchAuth.rejected]: (state,action)=>{
            state.data= null;
            state.status  = 'error';

        },
        [fetchAuthMe.pending]: (state,action)=>{
            state.data = null
            state.status = 'loading'

        },
        [fetchAuthMe.fulfilled]: (state,action)=>{
            state.data  = action.payload;
            state.status = 'loaded'


        },
        [fetchAuthMe.rejected]: (state,action)=>{
            state.data= null;
            state.status  = 'error';

        },
        [fetchRegister.pending]: (state,action)=>{
            state.data = null
            state.status = 'loading'

        },
        [fetchRegister.fulfilled]: (state,action)=>{
            state.data  = action.payload;
            state.status = 'loaded'


        },
        [fetchRegister.rejected]: (state,action)=>{
            state.data= null;
            state.status  = 'error';

        },
    }
})








export const isAuthSelector = state => Boolean(state.auth.data)
export const authReducer = authSlice.reducer;
export const {logout} = authSlice.actions;