import React from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Tasks from "./pages/Tasks/Tasks";
import Designer from "./pages/Designer/Designer";
import Header from "./components/Header/Header";

const RootLayout: React.FC<{ setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; darkMode: boolean }> = ({ setDarkMode, darkMode }) => {
	return (
		<>
			<Header
				setDarkMode={setDarkMode}
				darkMode={darkMode}
			/>
      <Outlet />
		</>
	);
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout setDarkMode={() => {}} darkMode={false} />, // Passing default props, they'll be replaced
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/tasks',
        element: <Tasks />,
      },
      {
        path: '/designer',
        element: <Designer />,
      },
    ],
  },
]);

const Routes: React.FC<{ setDarkMode: React.Dispatch<React.SetStateAction<boolean>>; darkMode: boolean }> = ({ setDarkMode, darkMode }) => {
	return (
		<>
			
			<RouterProvider router={router}>
        <RootLayout
          setDarkMode={setDarkMode}
          darkMode={darkMode}
        />
      </RouterProvider>
		</>
	);
};

export default Routes;
