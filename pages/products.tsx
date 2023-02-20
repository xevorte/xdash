import * as COMPONENT from 'components'
import * as API from './api'
import * as fas from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'

export default function Page() {
  const [products, setProducts] = useState([]);
  const [pagedProducts, setPagedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    brand: '',
    category: '',
    price: 1200,
  });
  const [search, setSearch] = useState('');

  const getProductsAction = useCallback(async () => {
    const response = await API.getProductsApi();

    if (response?.status === 200) {
      setProducts(
        response?.data?.products
          ?.filter((product: any) =>
            product.title.toLowerCase().includes(search.toLowerCase())
          )
          .filter((product: any) => product.brand.includes(filter.brand))
          .filter((product: any) => product.category.includes(filter.category))
      );
      setBrands(
        Array.from(new Set(
          response?.data?.products?.map((product: any) => product.brand)
        ))
      );
      setCategories(
        Array.from(new Set(
          response?.data?.products?.map((product: any) => product.category)
        ))
      );
      setLoading(false);
    } else {
      console.log(response);
    }
  }, [search, filter.brand, filter.category]);

  useEffect(() => {
    getProductsAction();
  }, [getProductsAction]);

  return (
    <COMPONENT.Layout>
      <COMPONENT.Header label='Products' labelFull className='w-full'>
        <COMPONENT.Select
          defaultValue={filter.brand}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, brand: e.target.value }))
          }
          placeholder='Filter Brand'
          options={brands}
        />
        <COMPONENT.Select
          defaultValue={filter.category}
          onChange={(e) =>
            setFilter((prev) => ({ ...prev, category: e.target.value }))
          }
          placeholder='Filter Category'
          options={categories}
        />
        <COMPONENT.InputRange
          id='price'
          label={`Max Price (${filter.price})`}
          min={0}
          max={1200}
          value={filter.price}
          onChange={(e) => {
            setFilter((prev: any) => ({ ...prev, price: e.target.value }));
          }}
        />
        <COMPONENT.InputText
          id='search'
          value={search}
          placeholder='Search...'
          leftIcon={fas.faSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </COMPONENT.Header>
      <div className='w-full lg:min-w-full lg:w-0 rounded-lg overflow-x-auto pb-8 mt-12'>
        <table className='w-full table-auto bg-white rounded-xl overflow-hidden'>
          <thead>
            <tr className='bg-indigo-500'>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>ID</th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Image
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Title
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Description
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Brand
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Category
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Rating
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Stock
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              pagedProducts.length > 0 ? (
                pagedProducts.map((product: any, id: number) => (
                  <tr key={id} className='border-t border-b'>
                    <td className='font-medium p-8'>{product?.id}</td>
                    <td className='py-8'>
                      <Image
                        src={product?.thumbnail}
                        width={400}
                        height={400}
                        className='rounded-lg'
                        alt='thumbnail'
                      />
                    </td>
                    <td className='font-medium p-8'>{product?.title}</td>
                    <td className='font-medium p-8'>{product?.description}</td>
                    <td className='font-medium p-8'>{product?.brand}</td>
                    <td className='font-medium p-8'>{product?.category}</td>
                    <td className='font-medium p-8'>{product?.rating}</td>
                    <td className='font-medium p-8'>{product?.stock}</td>
                    <td className='font-medium p-8'>$ {product?.price}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className='text-xl text-rose-500 text-center font-bold px-2 py-6'
                  >
                    No Data
                  </td>
                </tr>
              )
            ) : (
              [...Array(4)].map((el, id) => (
                <tr key={id} className='animate-pulse border-t border-b'>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      0
                    </div>
                  </td>
                  <td className='py-8'>
                    <Image
                      src='/assets/images/empty.jpg'
                      width={400}
                      height={400}
                      className='rounded-lg'
                      alt='thumbnail'
                    />
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      title
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sapiente, corrupti.
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      brand
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      category
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      rating
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      stock
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      $ 999
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <COMPONENT.Pagination
          items={products}
          setPagedItems={setPagedProducts}
        />
      </div>
    </COMPONENT.Layout>
  );
}