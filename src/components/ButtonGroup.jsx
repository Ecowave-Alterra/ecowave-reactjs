import { useState } from "react";

const ButtonGroup = ({ buttons, getData }) => {
  const [clickedId, setClickedId] = useState(0);

  const handleClick = (event, id) => {
    setClickedId(id);
    getData(event);
  };

  return (
    <>
      {buttons.map((buttonLabel, i) => (
        <button
          key={i}
          name={buttonLabel}
          onClick={(event) => handleClick(event, i)}
          className={
            i === clickedId
              ? "text-white font-semibold rounded-t-[4px] px-2 bg-green-500 py-[11px]"
              : "text-gray-700 bg-gray-50 rounded-t-[4px] px-[10px] py-2"
          }
        >
          {buttonLabel}
        </button>
      ))}
    </>
  );
};

export default ButtonGroup;
