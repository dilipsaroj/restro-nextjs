import { PRICE, PrismaClient } from '@prisma/client';
import Header from './component/Header';
import RestaurantCard from './component/RestaurantCard';;
import SearchSidebar from './component/SearchSidebar';

const prisma = new PrismaClient();

interface SearchParams {
    city?: string, cuisine?: string, price?: PRICE
}
const fetchRestaurantCity = (searchParams: SearchParams) => {
    const where: any = {};

    if (searchParams.city) {
        const location = {
            name: {
                equals: searchParams.city.toLowerCase()
            }
        }
        where.location = location;
    }

    if (searchParams.cuisine) {
        const cuisine = {
            name: {
                equals: searchParams.cuisine.toLowerCase()
            }
        }
        where.cuisine = cuisine;
    }

    if (searchParams.price) {
        const price = {
            equals: searchParams.price
        }
        where.price = price;
    }

    const select = {
        id: true,
        name: true,
        main_image: true,
        price: true,
        cuisine: true,
        location: true,
        slug: true,
        reviews:true
    };

    return prisma.restaurant.findMany({
        where,
        select,
    })
}

const fetchLocation = async () => {
    return prisma.location.findMany({})
}

const fetchCuisine = async () => {
    return prisma.cuisine.findMany({})
}

const Search = async ({ searchParams }: { searchParams: SearchParams }) => {
    const restaurants = await fetchRestaurantCity(searchParams);
    const location = await fetchLocation();
    const cuisine = await fetchCuisine();

    return (
        <>
            <Header />
            <div className='flex py-4 m-auto w-2/3 justify-between items-start'>
                <SearchSidebar locations={location} cuisines={cuisine} searchParams={searchParams} />
                <div className='w-5/6'>
                    {
                        restaurants.length ?
                            (
                                restaurants.map((item) => (
                                    <RestaurantCard restaurant={item} />
                                ))
                            )
                            : <p>No record found</p>
                    }
                </div>
            </div>
        </>
    )
}
export default Search;
