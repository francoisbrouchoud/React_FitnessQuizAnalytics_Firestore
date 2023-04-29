import { createContext, useState } from 'react';

/**
 * ThemeContext is a React Context that is used to provide the theme to the application.
 * The theme is stored in the ThemeContext and is accessible to all the components in the application.
 */
export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

/**
 * ThemeProvider is a custom component that uses the useContext hook to access the theme from the ThemeContext.
 * @param children : The child components of the ThemeProvider component are wrapped with the ThemeContext.Provider component.
 * @returns {JSX.Element} : The child components
 * @constructor
 */
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
