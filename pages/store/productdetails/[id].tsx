import Footer from "@/app/_components/Footer";
import Navbar from "@/app/_components/Navbar";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export async function getServerSideProps() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
  )
  const { data } = await supabaseAdmin
    .from('Products')
    .select('*')
    .order('id')
  return {
    props: {
      products: data,
    },
  }
}

export default function ProductPage(data: any) {
  
  const [count, setCount] = useState<number>(0);
  const router = useRouter();
  const { id } = router.query as { id: string };
  const product = data?.products?.find((p:any) => p.id === Number(id)) ?? null;
  const { name, description, imageUrl, category, brand, price, stock, longName, longDescription} = product ?? {};

  function handleIncrementClick() {
    setCount(count + 1)
  }

  function handleDecrementClick() {
    setCount(count - 1) 
  }

  function handleAddToCart() {
  }

  function handleBuyNow() {
  }

  function handleRequestStock() {
    
  }
  
  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto py-2 px-4 sm:py-10 sm:px-6 lg:max-w-7xl lg:px-0 sm:flex-col">
        <div className="flex flex-row items-start mb-16 max-w-7xl">
          <Link href={'/store'}>
            <button className="py-2 mr-1 lg:px-8 lg:ml-4">
              Products &gt;
            </button>
          </Link>
          {category
            ? <Link href={`/store/${category}`}>
              <span className="py-2 mr-1">{category} &gt;</span>
              </Link>
            : <span></span>
          }
          {brand
            ? <Link href={`/store/${brand}`}>
              <span className="py-2 mr-1">{brand} &gt;</span>
              </Link>
            : <span></span>
          }

        </div>
        <div className="flex flex-row justify-between lg:px-16">
          <div className="max-w-xs lg:ml-2 flex justify-center flex-col">
            <h1 className="mb-12 lg:hidden">{name}</h1>
            <Image className="mb-20 max-w-2xl rounded-lg" src={imageUrl} alt={description} width={320} height={320} />
          </div>
          <div className="w-80 lg:ml-4 flex justify-start flex-col">
            <div>
              <h1>{name}</h1>
              <h1>{longName}</h1>
            </div>
            <div>
              $ {price}
            </div>
            <div>
              {longDescription}
            </div>
          </div>
          <div className="max-w-sm px-4 py-2 rounded-lg bg-slate-200 lg:ml-4 flex justify-between items-center flex-col">
            <div className="mt-4 w-44">
              <h2>$ {price} </h2>
            </div>
            <div className="my-8 pr-1.5">
              Free Delivery & Returns.
            </div>
            <div  className="my-16 mt-16">
              {stock
                ? ( stock > 10 ? <h2> In Stock </h2> : <h2> Only {stock} left in Stock!</h2>)
                : <div className="flex flex-col justify-between items-center">
                    <h2 className="mb-4">Out of stock!</h2>
                    <button className="bg-cyan-400 rounded-lg text-slate-600 py-2.5 px-6" onClick={handleRequestStock}>Request Stock</button>
                  </div>
              }
            </div>
            <div>
              <div>
                <select></select>
              </div>
              <div className="mb-8 flex justify-center">
                <button onClick={handleAddToCart} className="bg-orange-400 rounded-lg text-slate-600 py-2.5 px-6">Add To Cart</button>
              </div>
              <div className="mb-8 flex justify-center">
                <button onClick={handleBuyNow} className="bg-lime-400 rounded-lg text-slate-600 py-2.5 px-6">Buy Now</button>
              </div>
            </div>
          </div>
        </div> 
        <div className="max-w-xs lg:ml-24 flex justify-center flex-col lg:hidden">
          <h3 className="break-words mb-12 lg:hidden" style={{ inlineSize: '320px' }}>{description}</h3>
          <div className="flex justify-between max-w-xs mb-12 lg:hidden">
            Price:
            <h2 className="">$ {price}</h2>
          </div>
          <div className='flex justify-between items-center mt-2 lg:hidden'>
            <div className="flex justify-between flex-col">Quantity:
              <div className="w-24 flex justify-between">
                <button className="bg-emerald-200 w-7 px-2 rounded-sm" disabled={count===0} onClick={handleDecrementClick}>
                  -
                </button>
                {count}
                <button className="bg-orange-400 w-7 px-2 rounded-sm" onClick={handleIncrementClick}>
                  +
                </button>
              </div>
            </div>
            <button className="p-4 rounded-lg bg-emerald-300 text-stone-600 lg:hidden" onClick={handleAddToCart}>Add to cart</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}