import { DataView } from '@/interfaces/DataView'
import { data } from 'autoprefixer'
import React from 'react'

interface Props {
  datas: DataView[]
}

function Viewdata({ datas }: Props) {
  return (
    <div className='max-w-lg mx-auto my-8 p-4 bg-gray-100 rounded-lg shadow-lg'>
      <p className='text-lg mb-4'>
        Esta es una aplicación para administrar las tareas. Estas son las funciones que tenemos:
      </p>
      <ul>
        {datas.map((data) => (
          <li key={data.data} className='mb-4 p-4 bg-white rounded-lg shadow-md'>
            <h2 className='text-xl font-semibold mb-2'>
              {data.data}
            </h2>
            <p className='text-gray-700'>
              {data.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Viewdata