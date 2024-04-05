import { PrismaClient, Review } from '@prisma/client';
import { error } from 'console';
import { notFound } from 'next/navigation';
import Description from './component/Description';
import Header from './component/Header';
import Images from './component/Images';
import Rating from './component/Rating';
import Reservation from './component/Reservation';
import RestaurantNavBar from './component/RestaurantNavBar';
import Reviews from './component/Reviews';
import Title from './component/Title';

const Prisma = new PrismaClient;

interface Restaurant {
    id: number;
    name: string;
    images: string[];
    description: string;
    slug: string;
    reviews: Review[],
    open_time: string,
    close_time: string
}
const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
    const restaurant = await Prisma.restaurant.findUnique({
        where: {
            slug,
        },
        select: {
            id: true,
            name: true,
            images: true,
            description: true,
            slug: true,
            reviews: true,
            open_time: true,
            close_time: true
        }
    })
    if (!restaurant) {
        notFound();
    }

    return restaurant;
}

const RestaurantDetails = async ({ params }: { params: { slug: string } }) => {
    const restaurant = await fetchRestaurantBySlug(params.slug);

    return (
        <>
            <div className='bg-white w-[70%] rounded p-3 shadow'>
                <RestaurantNavBar slug={restaurant.slug} />
                <Title name={restaurant.name} />
                <Rating review={restaurant.reviews} />
                <Description description={restaurant.description} />
                <Images images={restaurant.images} />
                <Reviews reviews={restaurant.reviews} />
            </div>
            <div className='w-[27%] relative text-reg'>
                <Reservation openTime={restaurant.open_time} closeTime={restaurant.close_time} slug={restaurant.slug} />
            </div>
        </>
    )
}

export default RestaurantDetails;