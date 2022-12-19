import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const fetchPizzas = createAsyncThunk(
  'pizza/fetchPizzasStatus',
  async () => {
    const API =
      'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20221218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20221218T170250Z&X-Amz-Expires=86400&X-Amz-Signature=4c04f5077a7c253b1b19c23899425a810228e17fd70229e2493a6a3775a20ab4&X-Amz-SignedHeaders=host&response-content-disposition=filename%3D%22pizzas.json%22&x-id=GetObject'
    const res = await fetch(API)
    const data = await res.json()
    return data
  }
)
const initialState = {
  items: [],
  status: '',
}

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState: initialState,
  reducers: {},
  extraReducers:
    // [fetchPizzas.pending]: (state, action) => {
    //   console.log('pending')
    // },
    // [fetchPizzas.fulfilled]: (state, action) => {
    //   state.items = action.payload
    // },
    (builder) => {
      builder
        .addCase(fetchPizzas.pending, (state) => {
          state.status = 'loanding'
          state.items = []
        })
        .addCase(fetchPizzas.fulfilled, (state, action) => {
          state.items = action.payload
          state.status = 'success'
        })
        .addCase(fetchPizzas.rejected, (state) => {
          state.status = 'error'
          state.items = []
        })
    },

  // [fetchPizzas.rejected]: (state, action) => {
  //   console.log('rejected')
  // },
})

export const {} = pizzaSlice.actions

export default pizzaSlice.reducer
