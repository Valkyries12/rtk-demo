const createSlice = require("@reduxjs/toolkit").createSlice;
const createAsyncThunk = require("@reduxjs/toolkit").createAsyncThunk;
const axios = require("axios");

const initialState = {
    loading: false,
    users: [],
    error: ""
};

//para hacer axyncrono necesito usar createAsyncThunk
//lleva 2 parm, el primero el action name y el segundo un callback que crea el payload
//genera pending, fulfilled y rejected actions types. Se puede escuchar a estas acciones con un reducer y hacer las transiciones necesarias
//se tienen que agregar como extrareducer
const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
    return axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => response.data.map(user => user.id))
});

const userSlice = createSlice({
    name: "user",
    initialState,
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
            state.loading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = "";
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false;
            state.users = [];
            state.error = action.error.message;
        });
    }
});

module.exports = userSlice.reducer;
module.exports.fetchUsers = fetchUsers;