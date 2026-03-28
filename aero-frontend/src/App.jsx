import React, { useState } from "react";
import Desktop from "./Desktop";
import Boot from "./pages/Boot";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
//CSS
import "./styles/index.css";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "katex/dist/katex.min.css";

function App() {
  const [login, setLogin] = useState(false);

  if (login) {
    return <Desktop setLogin={setLogin} />;
  } else {
    // return <Auth setLogin={setLogin} />;
    return <Login setLogin={setLogin} />;
  }
  // return <Desktop />;
}

export default App;
