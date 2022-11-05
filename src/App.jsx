import { useState } from "react";
import {
  Navbar,
  Welcome,
  Footer,
  Services,
  Transaction,
} from "../src/components/index";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome">
        <Navbar />
        <Welcome />
      </div>
      <Services />
      <Transaction />
      <Footer />
    </div>
  );
}

export default App;
