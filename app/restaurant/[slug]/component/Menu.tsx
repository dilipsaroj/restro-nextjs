import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";

const Menu = ({ menu }: { menu: Item[] }) => {
    return (
        <main className='bg-white mt-5'>
            <div className=''>
                <div className='mt-4 pb-1 mb-1'>
                    <h1 className='font-bold text-4xl '>Menu</h1>
                    <div className='flex flex-wrap justify-between'>
                        {
                            menu.length ?
                                <>
                                    {
                                        menu.map((item) => (
                                            <MenuCard key={item.id} item={item} />
                                        ))
                                    }
                                </>
                                :
                                <>
                                    <p>This restaurant does not have Menu</p>
                                </>
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}
export default Menu;