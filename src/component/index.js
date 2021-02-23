import {combineReducers} from 'redux'
import asyncDeleteImgOnWindowReducer from './deleteImgOne'

// CombineReducers More than One
const allReducers = combineReducers({
   deleteImgOne: asyncDeleteImgOnWindowReducer 
});

export default allReducers;