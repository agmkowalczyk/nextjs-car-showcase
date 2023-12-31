import { CarCard, CustomFilter, Hero, SearchBar, ShowMore } from '@/components'
import { fuels, yearsOfProduction } from '@/contants'
import { fetchCars } from '@/utils'
import { FilterProps } from '@/types'

const Home = async ({ searchParams }: { searchParams: FilterProps }) => {
  const { manufacturer, model, year, fuel, limit } = searchParams
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

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} selected={fuel} />
            <CustomFilter
              title='year'
              options={yearsOfProduction}
              selected={`${year}`}
            />
          </div>

          {!isDataEmpty ? (
            <section className='w-full'>
              <div className='home__cars-wrapper'>
                {allCars.map((car, key) => (
                  <CarCard key={`${car.model}-${key}`} car={car} />
                ))}
              </div>

              <ShowMore
                pageNumber={(searchParams.limit || 10) / 10}
                isNext={(searchParams.limit || 10) > allCars.length}
              />
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
