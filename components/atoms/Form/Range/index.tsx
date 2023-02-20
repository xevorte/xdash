import clsx from 'classnames'

type PropsTypes = {
  label: string,
  id: string,
  min: number | string,
  max: number | string,
  className: string,
  value: string | number,
  placeholder: string,
  onChange: (e: any) => void,
};

export default function Component(props: Partial<PropsTypes>) {
  const { label, id, min, max, className, value, placeholder, onChange } = props;

  return (
    <div className='flex items-center justify-between w-full bg-white py-3 px-4 rounded-lg'>
      <label className="text-base text-indigo-500 font-medium mr-4">
        {label}
      </label>
      <input
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
        className={clsx('bg-indigo-100 rounded-lg appearance-none', className)}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
