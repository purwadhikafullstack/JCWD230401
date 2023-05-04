import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",

  initialState: {
    name: "", 
    email: "",
    role: "",
    isVerified: "",
    image_profile: "",
    birth: "",
    gender: "",
    password: "",
  },

  reducers: {
    loginAction: (state, action) => {
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
        state.isVerified = action.payload.isVerified;
        state.image_profile = action.payload.image_profile;
        state.birth = action.payload.birth;
        state.gender = action.payload.gender;
        console.log("Data role dari reducer :", state.role);
        console.log("Data isVerified dari reducer :", state.isVerified);
        console.log("Data image_profile dari reducer :", state.image_profile);
        console.log("Data birth dari reducer :", state.birth);
        console.log("Data gender dari reducer :", state.gender);
        console.log("Data name dari reducer :", state.name);
        console.log("Data email dari reducer :", state.email);
    },
    logoutAction: (state) => {
        state.name = "";
        state.email = "";
        state.role = "";
        state.image_profile = "";
        state.isVerified = "";
        state.birth = "";
        state.gender = "";
        state.password= "";
        console.log("Data role dari reducer logoutaction :", state.role);
        console.log("Data image_profile dari reducer logoutaction :", state.image_profile);
    },
    loginActionGoogle: (state, action) => {
      const { getuser } = action.payload;
      state.name = getuser[0].user_detail.name;
      state.email = getuser[0].email;
      state.role = getuser[0].role.role;
      state.isVerified = getuser[0].isVerified;
      state.image_profile = getuser[0].user_detail.image_profile;
      state.birth = getuser[0].user_detail.birth;
      state.gender = getuser[0].user_detail.gender;
      state.password = getuser[0].password;
      console.log("Data role dari reducer google :", state.role);
      console.log("Data isVerified dari reducer google :", state.isVerified);
      console.log("Data image_profile dari reducer google :", state.image_profile);
      console.log("Data birth dari reducer google :", state.birth);
      console.log("Data gender dari reducer google :", state.gender);
      console.log("Data name dari reducer google :", state.name);
      console.log("Data email dari reducer google :", state.email);
    },
  },
});

export const {loginAction, logoutAction, loginActionGoogle} = authSlice.actions;

export default authSlice.reducer;