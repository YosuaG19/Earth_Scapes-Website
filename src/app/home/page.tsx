'use client'

import Navbar from "../components/Navbar";
import Banner from "../components/home/Banner";
import Categories from "../components/home/Categories";
import Recommended from "../components/home/Reccomended";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Categories></Categories>
      <Recommended></Recommended>
      <Footer></Footer>
    </>
  );
}
