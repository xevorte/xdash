import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as fas from '@fortawesome/free-solid-svg-icons'

type PropsTypes = {
  defaultValue: string | number,
  onChange: (e: any) => void,
  placeholder: string | number,
  options: string[],
}

export default function Component(props: Partial<PropsTypes>) {
  const { defaultValue, onChange, placeholder, options } = props;

  return (
    <div className="flex items-center justify-between w-full bg-white py-3 px-4 rounded-lg">
      <select
        defaultValue={defaultValue}
        onChange={onChange}
        className="bg-transparent w-4/5 text-indigo-500 font-medium outline-none appearance-none"
      >
        <option value="">{placeholder}</option>
        {options?.map((option: string, id: number) => (
          <option key={id} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FontAwesomeIcon
        icon={fas.faChevronDown}
        className="w-2.5 text-indigo-500"
      />
    </div>
  );
}