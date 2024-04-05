import Header from './components/Header';
import RestaurantCards from './components/RestaurantCards';
import { PrismaClient, Cuisine, Location, PRICE, Review } from '@prisma/client';

export interface RestaurantCardType {
  id: number,
  name: string,
  main_image: string,
  cuisine: Cuisine,
  location: Location,
  price: PRICE,
  slug: string,
  reviews:Review[]
}

const prisma = new PrismaClient();
const fetchRestaurant = async (): Promise<RestaurantCardType[]> => {
  const restaurant = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews:true
    }
  });

  return restaurant;
}
export default async function Home() {
  const restaurants = await fetchRestaurant()

  return (
    <>
      <Header />
      <div className='py-3 px-36 mt-10 flex flex-wrap'>
        {
          restaurants.map((restaurant) => (
            <RestaurantCards restaurant={restaurant} />
          ))
        }
      </div>
    </>
  )
}
