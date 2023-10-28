import Head from 'next/head'
import { useState, useEffect } from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import Header from '../components/Header'
import Footer from '../components/Footer'
//import FilterMenu from '../components/FilterMenu'
import Listings from '../components/Listings/Listings'
import NewListingModal from '../components/Listings/NewListingModal'
import BookingModal from '../components/Listings/BookingModal'
import { useAirbnb } from '../hooks/useAirbnb'
import Link from "next/link";
//import Image from "next/image";

export default function Home() {
  const [showReservedListing, setShowReservedListing] = useState(false)
  const [showNewListingModal, setShowNewListingModal] = useState(false)
  const [showReserveListingModal, setShowReserveListingModal] = useState(false)

  const { userAddress } = useAirbnb()

  return (
    <div>
      <Head>
        <title>Blocklock Rentals</title>
      </Head>

      <Header />
      <main className='pb-20'>
        <div className= 'bg-black text-white'>
        {/*<FilterMenu />*/}
        <section className="flex items-center space-x-2 bg-black text-white">
          <div className="flex justify-center">
            <ConnectButton />
          </div>

        <div className="flex items-center space-x-2 px-2 md:px-5 py-2 border-black border-2 flex-1">
      
        </div>

        <Link href="/listing">
          <button className="border-2 border-white px-5 md:px-10 py-2 bg-black text-white hover:bg-purple-600 hover:text-white  cursor-pointer mb-2 mt-2 ">
          List Rental
          </button>
        </Link>
      </section>
      <hr />

      <section className="flex py-3 space-x-6 text-xs md:text-sm whitespace-nowrap justify-center px-6 bg-black text-white">
      <div className='flex items-center divide-x'>
            <p className='text-white bg-transparent text-sm font-medium px-4'>
              Escrow
            </p>
            <p
              className='text-white bg-transparent text-sm font-medium px-4'
              type='text'
            >
              Buy
            </p>
            <p
              className='text-white bg-transparent text-sm font-medium px-4'
              type='text'
            >
              Sell
            </p>
            <p className='text-white bg-transparent text-sm font-medium px-4'>
              Rent
            </p>
            <p className='text-white bg-transparent text-sm font-medium px-4'>
              Syndicate
            </p>
          </div>
      </section>
    </div>
      
        <Listings setShowReserveListingModal={setShowReserveListingModal} />

        <NewListingModal
          showNewListingModal={showNewListingModal}
          setShowNewListingModal={setShowNewListingModal}
        />

        <BookingModal
          showReserveListingModal={showReserveListingModal}
          setShowReserveListingModal={setShowReserveListingModal}
        />
      </main>

      <Footer />
    </div>
  )
}
