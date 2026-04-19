import { createBrowserRouter } from 'react-router-dom';
import { MainLayout } from '../layouts/MainLayout';
import { EXAMPLE_LIST } from '../constants/exampleCatalog';
import { NotFound } from '../pages/NotFound';

const DashboardComponent = EXAMPLE_LIST[0].component;

const exampleRoutes = EXAMPLE_LIST.filter((example) => example.path !== '/').map((example) => {
  const ExampleComponent = example.component;

  return {
    path: example.path.slice(1),
    element: <ExampleComponent />,
  };
});

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <DashboardComponent /> },
      ...exampleRoutes,
      { path: '404', element: <NotFound /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
