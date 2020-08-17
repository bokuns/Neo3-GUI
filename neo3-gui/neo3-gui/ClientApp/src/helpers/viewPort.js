import React from 'react';

const viewPortContext = React.createContext({});

export const ViewportProvider = ({ children }) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);

  const handleWindowResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <viewPortContext.Provider value={{ width, height }}>
      { children }
    </viewPortContext.Provider>
  );
};

export const useViewPort = () => {
  const { width, height } = React.useContext(viewPortContext);
  return { width, height };
};
