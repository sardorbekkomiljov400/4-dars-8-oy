import { ProductType } from "@/@types"
import BackButton from "@/components/BacButton"

async function getProduct(id: string): Promise<ProductType | null> {
    const res = await fetch(`http://localhost:3001/products/${id}`, {
        cache: "no-store",
    })

    if (!res.ok) return null

    return res.json()
}

const ProductDetail = async ({ params }: { params: { id: string } }) => {
    const { id } = params
    const product = await getProduct(id)

    if (!product) {
        return (
            <div className="p-20 text-center text-2xl">
                Product Not Found
            </div>
        )
    }

    return (
        <div className="max-w-[900px] mx-auto p-10">
            {/* Client component */}
            <BackButton />

            <div className="border rounded-2xl p-10 shadow-lg bg-white">
                <div className="flex justify-between text-gray-500 mb-4">
                    <span>ID: {product.id}</span>
                    <span>Category: {product.categoryId}</span>
                </div>

                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-600 mb-6">Premium Apple product</p>
                <div className="text-2xl font-bold text-blue-600">${product.price}</div>
            </div>
        </div>
    )
}

export default ProductDetail