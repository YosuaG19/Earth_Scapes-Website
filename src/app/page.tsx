'use client'

import Navbar from "./components/Navbar";
import Banner from "./components/home/Banner";
import Categories from "./components/home/Categories";
import Recommended from "./components/home/Reccomended";
import Carou from "./components/home/Carou";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Categories></Categories>
      <Recommended></Recommended>
      {/* <Carou></Carou> */}
      <Footer></Footer>
    </>
  );
}
