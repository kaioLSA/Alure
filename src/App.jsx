import React from "react";
import Navbar from "./constants/Navbar";
import Hero from "./constants/Hero";
import Sobre from "./constants/Sobre";
import Services from "./constants/Servides";
import Portfolio from "./constants/Portfolio";
import Contato from "./constants/Contato";
import Faq from "./constants/Faq";
import Footer from "./constants/Footer";

const App = () => {
  return (
    <div className="min-h-screen text-white">
        <Navbar />
        <Hero />
        <Sobre />
        <Services />
        <Portfolio />
        <Contato />
        <Faq />
        <Footer />
    </div>
  );
};

export default App;
