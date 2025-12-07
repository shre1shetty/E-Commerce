import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CountSlice from "./Slice/CountSlice";
import UserSlice from "./Slice/UserSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import WishListSlice from "./Slice/WishlistSlice";

const persistConfig = {
  key: "root",
  storage,
};

const reducers = combineReducers({
  count: CountSlice,
  role: UserSlice,
  wishlist: WishListSlice,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: {
    data: persistedReducer,
  },
});

export const persistor = persistStore(store);
