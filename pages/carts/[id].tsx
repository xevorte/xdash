import * as COMPONENT from 'components'
import * as API from '../api'
import * as fas from '@fortawesome/free-solid-svg-icons'
import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import clsx from 'classnames';

export default function Page() {
  const [cartDetail, setCartDetail] = useState<any>({});
  const [user, setUser] = useState<any>({});
  const [products, setProducts] = useState([]);
  const [pagedProducts, setPagedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const { query } = useRouter();

  const getUserDetailAction = useCallback(async (id: any) => {
    const response = await API.getUserDetailApi(id);

    if (response?.status === 200) {
      setUser(response?.data);
      setLoading(false);
    } else {
      console.log(response);
    }
  }, []);

  const getCartDetailAction = useCallback(async (id: any) => {
    const response = await API.getCartDetailApi(id);

    if (response?.status === 200) {
      setCartDetail(response?.data);
      setProducts(
        response?.data?.products?.filter((product: any) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        )
      );
      getUserDetailAction(response?.data?.userId);
    } else {
      console.log(response);
    }
  }, [search]);

  useEffect(() => {
    if (query.id) {
      getCartDetailAction(query.id);
    }
  }, [query, getCartDetailAction]);


  return (
    <COMPONENT.Layout>
      <COMPONENT.Header label={`Cart ${cartDetail.id}`} loading={loading}>
        <COMPONENT.InputText
          id='search'
          value={search}
          placeholder='Search...'
          leftIcon={fas.faSearch}
          onChange={(e) => setSearch(e.target.value)}
        />
      </COMPONENT.Header>
      <div className='mt-8 mb-12'>
        <h2 className='w-fit bg-indigo-500 font-semibold text-lg text-white px-16 py-3 cursor-pointer rounded-t-lg'>
          Detail
        </h2>
        <div
          className={clsx(
            'w-full grid grid-cols-1 rounded-tr-xl rounded-b-xl lg:grid-cols-2 xl:grid-cols-4',
            loading
              ? 'bg-slate-300 text-slate-300 cursor-wait animate-pulse'
              : 'bg-white'
          )}
        >
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>ID :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {cartDetail?.id}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>Total Amount :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {cartDetail?.total}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>Total Products :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {cartDetail?.totalProducts}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>Total Quantity :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {cartDetail?.totalQuantity}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>User Avatar :</p>
            <Image src={user?.image || '/assets/images/empty.jpg'} width={100} height={100} alt='avatar' className='mb-2 rounded-lg' />
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>User Name :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {user?.firstName + ' ' + user?.lastName}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>User Age :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {user?.age}
            </p>
          </div>
          <div className='flex items-center justify-between flex-wrap border border-neutral-100 pb-6 p-8'>
            <p className={clsx('font-medium mb-2', !loading ? 'text-indigo-500' : 'bg-slate-300')}>User Address :</p>
            <p className={clsx('font-semibold px-2 py-1 mb-2 rounded-md cursor-pointer', !loading ? 'bg-indigo-500 text-white' : 'text-slate-300')}>
              {user?.address?.address + ', ' + user?.address?.city}
            </p>
          </div>
        </div>
      </div>
      <div className='w-full lg:min-w-full lg:w-0 rounded-lg overflow-x-auto pb-8'>
        <table className='w-full table-auto bg-white rounded-xl overflow-hidden'>
          <thead>
            <tr className='bg-indigo-500'>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>ID</th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Title
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Quantity
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Total
              </th>
              <th className='text-white text-start px-8 pt-[26px] pb-6'>
                Discount
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
                    <td className='font-medium p-8'>{product?.title}</td>
                    <td className='font-medium p-8'>{product?.quantity} PCS</td>
                    <td className='font-medium p-8'>{product?.total}</td>
                    <td className='font-medium p-8'>
                      ${product?.discountedPrice} ({product?.discountPercentage}
                      %)
                    </td>
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
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      title
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      quantity
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      total
                    </div>
                  </td>
                  <td className='font-medium p-8'>
                    <div className='bg-slate-300 text-slate-300 p-4 cursor-wait select-none rounded-lg'>
                      discount
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