import Main from "../Pages/Main";
import Board from "../Pages/Board";
import Profile from "../Pages/Profile";

export const publicRoutes = [
    {id:1,path:'/', element: <Main/>, exact:true}
]

export const privateRoutes = [
    {id: 2, path: '/board/:url/', element: <Board/>, exact: true},
    {id: 3, path: '/profile/', element: <Profile/>, exact: true},
]