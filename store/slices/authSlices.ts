import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  name: string;
  email:string;
  password:string;
}

const initialState: AuthState = {
  name: "",
  email:"",
  password:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ name: string; email: string; password:string;
    }>) => {
      state.name = action.payload.name;
      state.email=action.payload.email;
      state.password=action.payload.password;
    },
  },
});

export const { setUserData } = authSlice.actions;
export default authSlice.reducer;
