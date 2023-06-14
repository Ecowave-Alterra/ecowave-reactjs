import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const Search = ({ id, placeholder, onChange, handleKeyDown }) => (
    <div className="container flex items-center">
        <div className="relative">
            <div className="absolute top-4 left-3">
                <MagnifyingGlassIcon className="w-6 h-6 mx-4 text-gray-300" />
            </div>
            <input
                type="text"
                className="h-14 rounded-[28px] pl-16 border-[1px] border-gray-300 w-[320px]"
                id={id}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={handleKeyDown}
            />
        </div>
    </div>
);

export default Search;
