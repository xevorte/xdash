import * as COMPONENT from 'components';
import * as API from '../api';
import * as fas from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Page() {
  const [carts, setCarts] = useState([]);
  const [pagedCarts, setPagedCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCartsAction = useCallback(async () => {
    const response = await API.getCartsApi();

    if (response?.status === 200) {
      setCarts(response?.data?.carts);
      setLoading(false);
    } else {
      console.log(response);
    }
  }, []);

  useEffect(() => {
    getCartsAction();
  }, [getCartsAction]);

  return (
    <COMPONENT.Layout>
      <COMPONENT.Header label='Carts' />
      <div className='w-full lg:min-w-full lg:w-0 rounded-lg overflow-x-auto pb-8 mt-12'>
        <table className='w-full sm:table-fixed bg-white text-center rounded-xl overflow-hidden'>
          <thead>
            <tr className='bg-indigo-500'>
              <th className='text-white px-8 pt-[26px] pb-6'>ID</th>
              <th className='text-white px-8 pt-[26px] pb-6'>Action</th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              pagedCarts.length > 0 ? (
                pagedCarts.map((cart: any, id: number) => (
                  <tr key={id} className='border-t border-b'>
                    <td className='font-medium p-8'>Cart {cart?.id}</td>
                    <td className='p-8'>
                      <div
                        className='flex items-center justify-between w-max bg-indigo-500 font-semibold text-white rounded-md pl-6 pr-7 py-2.5 mx-auto cursor-pointer transition-all hover:bg-indigo-600'
                        onClick={() => router.push(`/carts/${cart?.id}`)}
                      >
                        <FontAwesomeIcon
                          icon={fas.faPen}
                          className='w-4 mr-2'
                        />
                        <p className='text-[15px]'>Detail</p>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={2}
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
                      Action
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <COMPONENT.Pagination items={carts} setPagedItems={setPagedCarts} />
      </div>
    </COMPONENT.Layout>
  );
}