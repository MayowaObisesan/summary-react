import './App.css';
import './summary.css';
import './watched_eye.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ErrorElement } from './ErrorElement';
import { Root } from './Root';
import Summary from './Summary';
import { About } from './About';
import { Contact } from './Contact';
import { Terms } from './Terms';
import { PrivacyPolicy } from './PrivacyPolicy';
import { loader as rootLoader } from './Root';
import { loader as summaryLoader, action as summaryAction } from './Summary';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Summary />,
        loader: summaryLoader,
        // action: summaryAction,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/terms",
        element: <Terms />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      }
    ]
  }
])

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
