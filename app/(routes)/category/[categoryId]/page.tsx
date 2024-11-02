import Container from "@/components/ui/container"
import Billboard from "@/components/billboard"
import Filter from "./components/filter"

import getCategory from "@/actions/get-category"
import getColors from "@/actions/get-colors"
import getProducts from "@/actions/get-products"
import getSizes from "@/actions/get-sizes"
import NoResults from "@/components/ui/no-results"
import ProductCard from "@/components/ui/product-card"


interface CategoryPageProps {
  params: {
    categoryId: string
  },
  searchParams: {
    colorId: string
    sizeId: string
  }
}

async function CategoryPage({ params, searchParams }: CategoryPageProps) {

  const p = await params
  const sp = await searchParams

  const products = await getProducts({
    categoryId: p.categoryId,
    colorId: sp.colorId,
    sizeId: sp.sizeId
  })

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(p.categoryId);

  return (
    <div className="bg-white">
      <Container>
        <Billboard data={category.billboard} />
        <div className="px-4 sm:px-6 lg:px-8 pb-24">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* <div className="hidden lg:block"> */}
              {/* <Filter valueKey="sizeId" name="Sizes" data={sizes} /> */}
              {/* <Filter valueKey="colorId" name="Colors" data={colors} /> */}
            {/* </div> */}
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {products.map(item => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default CategoryPage