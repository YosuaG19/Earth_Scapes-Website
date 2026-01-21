'use client'

import Navbar from "../components/Navbar";
import Banner from "../components/Trips/Banner";
import Trip_List from "../components/Trips/Trip_List";
import Footer from "../components/Footer";

export default function Trips() {
  return (
    <>
      <Navbar></Navbar>
      <Banner></Banner>
      <Trip_List></Trip_List>
      <Footer></Footer>
    </>
  );
}
