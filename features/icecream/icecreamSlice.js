const { cakeActions } = require("../cake/cakeSlice");

const createSlice = require("@reduxjs/toolkit").createSlice;

const initialState = {
  numOfIceCream: 20,
};

const icecreamSlice = createSlice({
  name: "icecream",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfIceCream--;
    },
    restocked: (state, action) => {
      state.numOfIceCream += action.payload;
    },
    //en rtk reducers de un slice solo van a responder de types generados por el mismo slice
    //esto en clasic redux se podia hacer que iceream recibiera cake para que cuando venda un cake , tmb regale un helado
    //si queremos que un slice reaccione a otro action type aparte del propio generado, tengo que usar extra reducers
  },
  //se pueden escribir de dos formas. Una es haciendo un mapping obj donde la key corresponde a
  //un action type de un slice diferente
//   extraReducers: {
//     ["cake/ordered"]: (state) => {
//       state.numOfIceCream--;
//     },
//   },
//la forma recomendada de hacer esto es usando un builder
  extraReducers: (builder) => {
    //el primer argumento es el action type deseado, el segundo es una func que vca a ser el reducer.
    builder.addCase(cakeActions.ordered, state => {
        state.numOfIceCream--
    })
  }
});

module.exports = icecreamSlice.reducer;
module.exports.icecreamActions = icecreamSlice.actions;
