export async function fetchCars() {
  const headers = {
    'X-RapidAPI-Key': '0a50e2d713msh061bde77e99fb9dp11b7cfjsnc29d93c3cffb',
    'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com',
  }

  const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla'

  try {
    const response = await fetch(url, {
      headers,
    })

    const result = await response.json()

    return result
  } catch (error) {
    console.error(error)
  }
}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50 // Base rental price per day in dollars
  const mileageFactor = 0.1 // Additional rate per mile driven
  const ageFactor = 0.05 // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor
  const ageRate = (new Date().getFullYear() - year) * ageFactor

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate

  return rentalRatePerDay.toFixed(0)
}