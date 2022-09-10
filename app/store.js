//en redux se usaa creteSotre, en rtk configureStore
const configureStore = require("@reduxjs/toolkit").configureStore;
const cakeReducer = require("../features/cake/cakeSlice");
const icecreamReducer = require("../features/icecream/icecreamSlice");
const userReducer = require("../features/user/userSlice");
const reduxLogger = require("redux-logger");

const logger = reduxLogger.createLogger();

//con rtk no es necesrio usar combineReducers y hacer el rootReducer el configureStore hace todo
const store = configureStore({
    reducer: {
        cake: cakeReducer,
        icecream: icecreamReducer,
        users: userReducer,
    },
    //por defecto rtk trae middlewwares asi que le voy a concatenar a eso que tiene de default el middleware nuevo
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

module.exports = store;