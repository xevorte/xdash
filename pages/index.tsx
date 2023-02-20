import * as COMPONENT from 'components'
import * as API from './api'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, registerables } from 'chart.js/auto'
import { useState, useEffect, useCallback } from 'react'
import clsx from 'classnames'

ChartJS.register(...registerables)

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState<any>([]);

  const getProductsAction = useCallback(async () => {
    const response = await API.getProductsApi();

    if (response?.status === 200) {
      const labelsData: any = Array.from(
        new Set(response?.data?.products?.map((product: any) => product.brand))
      );

      const dataStocks = labelsData
        .map((label: any) =>
          response?.data?.products
            ?.filter((product: any) => product.brand.includes(label))
            .map((product: any) => product?.stock)
      );

      const stocks = [];

      for (let i = 0; i < dataStocks.length; i++) {
        let temp = [];
        for (let j = 0; j < dataStocks.length; j++) {
          let innerArr = dataStocks[j];
          if (Array.isArray(innerArr) && i < innerArr.length) {
            temp.push(innerArr[i]);
          } else {
            temp.push(0);
          }
        }
        stocks.push(temp);
      }

      setLabels(labelsData);
      setDatasets(
        stocks.map((stock: any) => ({
          label: 'Product',
          backgroundColor: `rgba(${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, 1)`,
          borderColor: 'rgba(99, 102, 241, 1)',
          borderWidth: 2,
          data: stock,
        }))
      );
      setLoading(false);
    } else {
      console.log(response);
    }
  }, []);

  useEffect(() => {
    getProductsAction();
  }, [getProductsAction]);

  return (
    <COMPONENT.Layout>
      <COMPONENT.Header label='Overview' />
      <div
        className={clsx(
          'min-w-full w-0 p-10 pb-5 mt-10 rounded-lg overflow-auto',
          loading ? 'bg-slate-300 animate-pulse cursor-wait' : 'bg-white'
        )}
      >
        <Bar
          options={{
            responsive: false,
            plugins: {
              legend: {
                display: false
              }
            },
            scales: {
              x: {
                ticks: {
                  color: 'rgb(203, 213, 225, 1)'
                },
                stacked: true,
              },
              y: {
                ticks: {
                  color: 'rgb(203, 213, 225, 1)'
                },
                stacked: true,
              },
            },
          }}
          width={1500}
          height={500}
          data={{ labels, datasets }}
        />
      </div>
    </COMPONENT.Layout>
  );
}