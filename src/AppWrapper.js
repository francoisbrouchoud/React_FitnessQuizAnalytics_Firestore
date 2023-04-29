import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {ThemeProvider} from "./ThemeContext";

/**
 * AppWrapper component is the root component of the application.
 * It wraps the App component with the BrowserRouter and ThemeProvider.
 * The BrowserRouter is used to provide routing functionality to the application.
 * The ThemeProvider is used to provide the theme to the application.
 * The theme is stored in the ThemeContext and is accessible to all the components in the application.
 * The ThemeProvider component is a custom component that uses the useContext hook to access the theme from the ThemeContext.
 * @returns {JSX.Element} : App component wrapped with BrowserRouter and ThemeProvider
 * @constructor
 */
export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}
