import { createStore  } from "vuex";


import user from './modules/User';
import article from './modules/Article';
import category from './modules/Category';

export const store = new createStore({
    state: {},
    modules: {
        user,
        article,
        category
    }
});

