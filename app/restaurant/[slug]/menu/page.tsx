import { PrismaClient } from '@prisma/client';
import Menu from '../component/Menu';
import RestaurantNavBar from '../component/RestaurantNavBar';

const prisma = new PrismaClient();
const fetchMenuItems = async (slug: string) => {
    const restaurant = await prisma.restaurant.findUnique({
        where: {
            slug
        },
        select: {
            items: true
        }
    })
    if(!restaurant){
        throw new Error("Could not found Menu")
    }
    return restaurant.items;
}

const RestaurantMenu = async ({ params }: { params: { slug: string } }) => {
    const menu = await fetchMenuItems(params.slug);
    return (
        <>
            <div className='bg-white w-full rounded p-3 shadow'>
                <RestaurantNavBar slug={params.slug} />
                <Menu menu={menu} />
            </div>
        </>
    )
}

export default RestaurantMenu;