import { CarCard, Hero, SearchBar } from '@/components'
import { fuels, yearsOfProduction } from '@/contants'
import { fetchCars } from '@/utils'
import { FilterProps } from '@/types'

const Home = async ({
  searchParams: { manufacturer, model, year, fuel, limit },
}: {
  searchParams: FilterProps
}) => {
  const allCars = await fetchCars({ manufacturer, model, year, fuel, limit })
  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars

  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore out cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar manufacturer={manufacturer} model={model} />

          

          {!isDataEmpty ? (
            <section>
              <div className='home__cars-wrapper'>
                {allCars.map((car, key) => (
                  <CarCard key={`${car.model}-${key}`} car={car} />
                ))}
              </div>
            </section>
          ) : (
            <div className='home__error-container'>
              <h2 className='text-black text-xl font-bold'>Oops, no result</h2>
              <p>{allCars?.message}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Home
