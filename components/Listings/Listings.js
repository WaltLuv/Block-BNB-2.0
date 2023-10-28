import ListingItem from './ListingItem'
import { useAirbnb } from '../../hooks/useAirbnb'

const Listings = ({ setShowReserveListingModal }) => {
  const { properties } = useAirbnb()

  return (
    <div className='max-w-6xl mx-auto py-2 px-6'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 mx-auto'>
        {properties.length > 0 &&
          properties.map((item, index) => (
            <ListingItem
              key={index}
              item={item}
              setShowReserveListingModal={setShowReserveListingModal}
            />
          ))}

        {properties.length === 0 && (
          <div className='text-center'>
            <h1 className='text-2xl font-bold'>No Listings Found</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Listings
