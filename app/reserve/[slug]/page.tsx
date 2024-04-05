import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import Form from './component/Form';
import Header from './component/Header';

const prisma = new PrismaClient();

const fetchRestroBySlug = async (slug: string) => {
    const resaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        }
    })
    if (!resaurant) {
        notFound()
    }
    return resaurant;
}

const Reserve = async (
    {
        params,
        searchParams
    }: {
        params: { slug: string };
        searchParams: { date: string, partySize: string }
    }
) => {
    const restaurant = await fetchRestroBySlug(params.slug)
    return (
        <div className='border-t h-screen'>
            <div className='py-9 w-3/5 m-auto'>
                <Header image={restaurant.main_image} name={restaurant.name} date={searchParams.date} partySize={searchParams.partySize} />
                <Form
                    slug={params.slug}
                    partySize={searchParams.partySize}
                    date={searchParams.date}
                />
            </div>
        </div>
    )
}
export default Reserve;