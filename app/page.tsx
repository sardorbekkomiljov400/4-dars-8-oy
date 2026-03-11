import Products from "@/modules/products"
import { GetAll } from "@/service"

export const revalidate = 60

const Home = async () => {

    const products = await GetAll("/products")
    const categories = await GetAll("/category")

    return (
        <Products
            categories={categories}
            products={products}
        />
    )
}

export default Home