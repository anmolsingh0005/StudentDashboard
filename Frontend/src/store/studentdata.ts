import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'Data',
  initialState: {
    enrolleddata: [], 
    coursedata: [],
    coursedetail:{},
    searchquery:'',
    headername:'Home',
  },
  reducers: {
    addenrolleddata: (state:any, action) => {
      return {
        ...state,
        enrolleddata: [...action.payload]
      };
    },

    addcoursedata: (state:any, action) => {
      return {
        ...state,
        coursedata: [...action.payload]
      };
    },

    addcoursedetail: (state:any, action) => {
      return {
        ...state,
        coursedetail: {...action.payload}
      };
    },

    addsearchquery: (state:any, action) => {
      return {
        ...state,
        searchquery: action.payload
      };
    },

    addheadername: (state:any, action) => {
      return {
        ...state,
        headername: action.payload
      };
    },
    

    clearValues: (state) => {
      state.enrolleddata = [];
      state.coursedata = [];
      state.coursedetail = {};
    },
  },
});

export const { addenrolleddata,addcoursedetail, clearValues,addcoursedata,addsearchquery,addheadername } = counterSlice.actions;

export default counterSlice.reducer;
