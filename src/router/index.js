import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

Vue.use(VueRouter);

import Register from "../components/Auth/Register";
import Login from "../components/Auth/Login";
import QuestionIndex from "../components/Questions/QuestionIndex";
import Welcome from "../components/Welcome";
import CreateCategory from "../components/Categories/Create";
import CreateQuestion from "../components/Questions/Create";
import ReadQuestion from "../components/Questions/ReadQuestion";

const routes = [
    {
        path: '/register',
        name: "Register",
        component: Register
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/questions',
        name: "QuestionIndex",
        component: QuestionIndex
    },
    {
        path: '/',
        name: "Welcome",
        component: Welcome
    },
    {
        path: '/categories',
        name: "Categories",
        component: CreateCategory
    },
    {
        path: '/ask',
        name: "CreateQuestion",
        component: CreateQuestion
    },
    {
        path: '/question/:slug',
        component: ReadQuestion,
        name: 'ReadQuestion'
    },
];

const router = new VueRouter({
    routes, // short for `routes: routes`,
    mode: 'history'
});
router.beforeEach((to, from, next) => {
    if (to.name !== 'Login' && to.name !== 'Register' && to.name !== 'Welcome' && !store.getters.isLoggedIn) {
        next({ name: 'Login' });
    } 
    else if (to.name == 'Login' && store.getters.isLoggedIn) {
        next({ name: 'QuestionIndex' });
    }
    else {
        next();
    }
});

export default router;
