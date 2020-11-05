import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { createLogger } from "redux-logger";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiService } from "./middlewares";
import * as reducers from "./ducks";

const persistConfig = {
  key: "root",
  storage,
  whiltelist: ["authUser"],
};

const configStore = () => {
  const middleWares = [apiService];
  const rootReducers = combineReducers(reducers);

  // console.log("reducers", reducers);
  const pReducer = persistReducer(persistConfig, rootReducers);
  if (process.env.NODE_ENV === "development") {
    middleWares.push(createLogger());
  }

  const composeEnhancer =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  //   console.log("middleWares", middleWares);
  const store = createStore(
    pReducer,
    composeEnhancer(applyMiddleware(...middleWares))
  );
  return store;
};

const store = configStore();

export const persistor = persistStore(store);
export default store;
