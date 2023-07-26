import Image from "next/image"
import Link from "next/link"

function ProductItem({item, addToCart}){
    return(
        <div className="bg-white rounded-xl mb-5 block">
            <div className="flex flex-col">
                <Link href={`/product/${item.slug}`}>
                    <a>
                        {/* <Image alt="book 1" src={item.image} className=" rounded-t-xl" width='100%' height='100%'/> */}
                        <img alt="book 1" src={item.image} className="rounded-t-xl" />
                    </a>
                </Link>
        
                <div className="flex flex-col items-center justify-center p-5">
                    <Link href={`/product/${item.slug}`}>
                        <a>
                            <h2 className="text-lg">{item.title}</h2>
                        </a>
                    </Link>
                    <p className="p-2">{item.price}</p>
                    <button onClick={() => addToCart(item)} className="rounded-xl bg-gray-700 text-white px-4 py-2">Add To Cart</button>
                </div>
            </div>
        </div>
    )
}
export default ProductItem