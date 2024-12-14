import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import lixeira from "./assets/lixeira.png";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      Olá
      <img src={lixeira} alt="" />
    </>
  </StrictMode>
);
