'use client';

import { Check } from '@phosphor-icons/react/dist/ssr';
import { useState } from 'react';

import { useClickOutside } from '@/hooks/use-click-outside';
import { classnames } from '@/shared/lib/class-names';

import { SelectIcon } from '../icons/select.icon';

export type OptionType<ValueType> = {
  label: React.ReactNode;
  value: ValueType;
};

type Props<ValueType> = {
  label?: React.ReactNode;
  value?: ValueType | null;
  options?: OptionType<ValueType>[];
  className?: string;
  onChange?: (value: ValueType) => void;
};

export default function Select<ValueType>({ label, value, options, className, onChange }: Props<ValueType>) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(options?.find((option) => option.value === value));

  const handleClose = () => {
    setIsOpen(false);
  };

  const ref = useClickOutside<HTMLDivElement>(handleClose);

  const handleOpenToggle = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (option: OptionType<ValueType>) => {
    if (option !== selected) {
      setSelected(option);
      onChange?.(option.value);
    }

    handleClose();
  };

  return (
    <div
      ref={ref}
      className={className}
    >
      {label && <label className="block text-sm/6 font-medium text-gray-900 dark:text-white">{label}</label>}
      <div className="relative">
        <button
          type="button"
          className="grid grid-cols-1 w-full py-1.5 pr-2 pl-3 text-left sm:text-sm/6
            text-gray-900 dark:text-white bg-white dark:bg-zinc-800 rounded-md
            outline-1 -outline-offset-1 outline-gray-300 dark:outline-white/10
            focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:focus:outline-white/20
            cursor-default"
          onClick={handleOpenToggle}
        >
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="block truncate">{selected?.label}</span>
          </span>
          <SelectIcon />
        </button>

        <ul
          className={classnames(
            'absolute z-10 mt-1 max-h-56 w-full py-1 text-base sm:text-sm bg-white dark:bg-zinc-800',
            'ring-1 ring-black/5 dark:ring-white/10 rounded-md shadow-lg focus:outline-hidden overflow-auto',
            { hidden: !isOpen },
          )}
          role="listbox"
          aria-labelledby="listbox-label"
          aria-activedescendant="listbox-option-3"
        >
          {options?.map((option, index) => (
            <li
              key={index}
              className="group relative py-2 pr-9 pl-3 text-gray-900 dark:text-white hover:text-white hover:bg-indigo-600 dark:hover:bg-sky-600 cursor-default select-none"
              onClick={() => handleOptionClick(option)}
            >
              <div className="flex items-center">
                <span className="block truncate font-normal">{option.label}</span>
              </div>

              {selected?.value === option.value && (
                <span
                  className="absolute inset-y-0 right-0 flex items-center pr-4
                    text-indigo-600 dark:text-sky-600 group-hover:text-white"
                >
                  <Check
                    className="size-5"
                    weight="bold"
                  />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
