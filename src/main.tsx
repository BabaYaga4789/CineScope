import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
<<<<<<< HEAD

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
=======
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <App />
    </ChakraProvider>
>>>>>>> 3565b438f7def254fd4b46b106b905c42419b97c
  </React.StrictMode>
);
