import React from 'react'
import { useState, useEffect } from 'react'
import { useAirbnb } from '../hooks/useAirbnb'
import Header from '../components/Header'
import Footer from '../components/Footer'
import NewListingModal from '../components/Listings/NewListingModal'
import {  
    checkNfts,  
} from '../components/web3connect';
import { useRouter } from 'next/router';
 

const listing = () => {

const [showNewListingModal, setShowNewListingModal] = useState(false)
const { userAddress } = useAirbnb()
const router = useRouter();

  useEffect(() => {
    const checkauth = setInterval(() =>{
      checkWallet()
    }, 2000);
    return () => clearInterval(checkauth);
    },[])

  
  async function checkWallet(){
    const output = await checkNfts();
    if (output === 0) {
      router.push("/denied")
      return;
    } 
  }

  return (
    <div>
        <Header />
        <main>
        {userAddress && (
          <div className='flex h-screen justify-center items-center'>
            <button
              onClick={() => setShowNewListingModal(true)}
              className='rounded border border-black px-10 py-3 transition-all bg-black text-white hover:bg-cyan-500 hover:text-white'
            >
              Add Listing
            </button>
          </div>
        )}

        <NewListingModal
          showNewListingModal={showNewListingModal}
          setShowNewListingModal={setShowNewListingModal}
        />
      </main>
      <Footer />
    </div>
  )
}

export default listing