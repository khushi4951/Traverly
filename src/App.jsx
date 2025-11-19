import React from "react";
import SignInModal from "./components/SignInModal";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";


export default function App(){
  return (
    <>
  <Navbar />
  <main>
    <Home />
    {/* ...other content */}
  </main>

  <Footer />
  <SignInModal />   {/* <-- add this */}
</>
  );
}
