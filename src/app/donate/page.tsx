'use client'

import Navbar from "../components/Navbar";
import Banner from "../components/donate/Banner";
import Categories from "../components/donate/Categories";
import Footer from "../components/Footer";

export default function DonatePage() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Categories></Categories>
      <Footer></Footer>
    </>
  );
}
