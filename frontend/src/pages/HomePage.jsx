import React from 'react'
import CategoryItem from '../componets/CategoryItem';
import FeaturedProducts from '../componets/FeaturedProducts';
import { useProductStore } from '../stores/useProductStore';



const categories = [
	{ href: "/fasion", name: "Fashion Dress", imageUrl: "/jeans.jpg" },
	
	{ href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
	{ href: "/glasses", name: "Glasses", imageUrl: "/glasses.jpg" },
	
	
	{ href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
	{href:"/mobile",name:"Mobile",imageUrl:"/mobile.jpg"},
	{href:"/smartGadgets",name:"Smart Gadgets",imageUrl:"/smartGadgets.jpg"},
	{href:"/electronics",name:"Electronics",imageUrl:"/electronics.jpg"},
	{href:"/beautyproducts",name:"Beauty Products",imageUrl:"/beautyproducts.jpg"},
	{href:"/sports",name:"Sports",imageUrl:"/sports.jpg"}
];

const HomePage = () => {
	const { fetchFeaturedProducts, products, isLoading } = useProductStore();

	React.useEffect(() => {
		fetchFeaturedProducts();
	}, []);
  
  return (
    <div className='relative min-h-screen text-white  overflow-hidden'>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className='text-center text-5xl sm:text-6xl font-bold text-blue-600 mb-4'>Categories</h2>
        <p className='text-gray-300 text-center text-xl mb-12 font-semibold'>Dicover the Latest Trends in eco-Friendly Fashion</p>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 '>
					{categories.map((category) => (
						<CategoryItem category={category} key={category.name} />
					))}
				</div>

				{!isLoading && products.length > 0 && <FeaturedProducts featuredProducts={products} />}
    
      </div>
    </div>
    
  )
}

export default HomePage

