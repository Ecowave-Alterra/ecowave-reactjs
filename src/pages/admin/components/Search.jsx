import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const InputField = ({ id, placeholder, onChange }) => (
  <div>
    {/* component */}
    <div className="relative flex items-center h-14 rounded-[28px] overflow-hidden border border-gray-300 w-[320px]">
      <MagnifyingGlassIcon className="w-6 h-6 mx-4" />
      <input
        className="h-full w-full outline-none border-transparent focus:border-transparent text-p3 "
        type="text"
        id={id}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  </div>
);

export default InputField;
