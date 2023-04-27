import { BrowserRouter } from "react-router-dom";
import App from "./App";
import {ThemeProvider} from "./ThemeContext";

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}
