'use client'

import Navbar from "../components/Navbar";
import Banner from "../components/trips/Banner";
import Categories from "../components/trips/Categories";
import Recommended from "../components/trips/Reccomended";
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
