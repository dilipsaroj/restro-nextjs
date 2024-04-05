import { Cuisine, Location, PRICE } from "@prisma/client";
import Link from "next/link";

const SearchSidebar = ({ locations, cuisines, searchParams }: { locations: Location[], cuisines: Cuisine[], searchParams: { city?: string, cuisine?: string, price?: PRICE } }) => {

    const price = [
        {
            price:PRICE.CHEAP,
            label:"$",
            className:'text-reg font-light border rounded-l p-2 w-full text-center'
        },
        {
            price:PRICE.REGULAR,
            label:"$$",
            className:'text-reg font-light border p-2 w-full text-center'
        },
        {
            price:PRICE.EXPENSIVE,
            label:"$$$",
            className:'text-reg font-light border rounded-r p-2 w-full text-center'
        }
    ]
    return (
        <div className='w-1/5'>
            <div className='border-b pb-4 flex flex-col'>
                <h1 className='mb-2'>Region</h1>
                {
                    locations.length ? (
                        locations.map((item) => (
                            <Link href={{
                                pathname: '/search',
                                query: {
                                    ...searchParams,
                                    city: item.name
                                }
                            }}
                                className='font-light text-reg capitalize' key={item.id} >{item.name}</Link>
                        ))
                    ) :
                        <p>No location found</p>
                }


            </div>
            <div className='border-b pb-4 mt-3 flex flex-col'>
                <h1 className='mb-2'>Cuisine</h1>
                {
                    cuisines.length ? (
                        cuisines.map((item) => (
                            <Link href={{
                                pathname: '/search',
                                query: {
                                    ...searchParams,
                                    cuisine: item.name
                                }
                            }}
                                className='font-light text-reg capitalize' key={item.id}>{item.name}</Link>
                        ))
                    ) :
                        <p>No Cuisine found</p>
                }

            </div>
            <div className='mt-3 pb-4'>
                <h1 className='mg-2'>Price</h1>
                <div className='flex'>
                    {
                        price.map(({price,label,className})=>(
                            <Link
                        href={{
                            pathname: '/search',
                            query: {
                                ...searchParams,
                                price
                            }
                        }}
                        className={className}>{label}</Link>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default SearchSidebar;