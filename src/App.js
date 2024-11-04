import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Body from "./components/Body";
import  RecieptReturns from './components/RecieptReturns';
import BatchManagement from './components/BatchManagement';
import ROManagement from './components/ROManagement';
import CleaningSorting from './components/CleaningSorting';
import RMAList from './components/RMAList';

function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Body />,
      children: [
        {
          path: '/',
          element: <RecieptReturns />,
        },
        {
          path: '/batch-management',
          element: <BatchManagement />
        },
        {
          path: '/RO-management',
          element: <ROManagement />
        },
        {
          path: '/cleaning-sorting',
          element: <CleaningSorting />
        },
        {
          path: '/RMA',
          element: <RMAList />
        },
      ]
    }

  ])
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;
