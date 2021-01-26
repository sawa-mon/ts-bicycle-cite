import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware,
  compose,
} from "redux";
import { connectRouter, routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";
import * as History from 'history'

// import { UsersReducer } from "../users/reducers";
// import { AreaPointsReducer } from "../areapoints/reducer";

const composeEnhancers = (window as any).window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history: History.History) {
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      // areapoints: AreaPointsReducer,
      // users: UsersReducer,
    }),
    //DevTools用
    composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
  );
}
