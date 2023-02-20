import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import clsx from 'classnames';

type PropsTypes = {
  id: string;
  className: string;
  value: string;
  placeholder: string;
  leftIcon: IconProp,
  onChange: (e: any) => void;
};

export default function Component(props: Partial<PropsTypes>) {
  const { id, className, value, placeholder, leftIcon, onChange } = props;

  return (
    <div
      className={clsx('flex items-center bg-white px-5 py-3 rounded-lg', className)}
    >
      {leftIcon && (
        <FontAwesomeIcon
          icon={leftIcon || 'home'}
          className="w-5 text-indigo-500 mr-3.5"
        />
      )}
      <input
        type="text"
        id={id}
        name={id}
        className="w-full bg-transparent text-base text-indigo-500 font-medium outline-none p-0 transition-all placeholder:text-slate-400"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
}
