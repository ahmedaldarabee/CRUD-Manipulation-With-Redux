// Routing Page

import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./pages/RootLayout";
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ErrorPage from "./pages/ErrorPage";
import store from './store';
import Index from "./pages/Index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));

  // the target of this section is code-spilling on the notebook!
  const AddPost = React.lazy(() => import("./pages/Add"));
  const Edit = React.lazy(() => import("./pages/Edit"));
  const Details = React.lazy(() => import("./pages/Details"));

  const postParameterHandler = ({params}) => {
      if(isNaN(params.id)){
        throw new Response("Bad Request", {
          statusText:"Send corrected data!",
          status:400
        })
      }
  }

const router = createBrowserRouter([
  // first direction,
  {
    path:"/",
    element:<RootLayout />,
    errorElement:<ErrorPage />,
    children:[
      {
        index: true,
        element: <Index/>
      },{
        path:"post",
        element: <Index/>
      },
      {
        path:"post/add",
        element:(
            <Suspense fallback="loading please wait...">
              <AddPost name="testing parameters that sended -1 -5"/>
            </Suspense>
          ),
      }, {
        path:"post/:id/edit",
        element:(
            <Suspense fallback="loading please wait...">
              <Edit />
            </Suspense>
          ),
        loader: postParameterHandler // that used because we will send needed page as a parameter
      }, {
        path:"post/:id",
        element:
          (
            <Suspense fallback="loading please wait...">
              <Details />
            </Suspense>
          )
        ,
        loader: postParameterHandler
      }  
    ]
  }

])

root.render(
  <Provider store={store}>
  {/* to provide main routing operations */}
    <RouterProvider router={router} />
  </Provider>
);
