import { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

const ButtonGroup = ({ buttons, getData }) => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [activeButton, setActiveButton] = useState("");

    useEffect(() => {
        const filterValue = searchParams.get("filter");
        setActiveButton(filterValue || buttons[0]);
    }, [searchParams]);

    const handleClick = (event, buttonLabel) => {
        setActiveButton(buttonLabel);
        getData(event);
    };

    return (
        <>
            {buttons.map((buttonLabel, i) => (
                <button
                    key={i}
                    name={buttonLabel}
                    onClick={(event) => handleClick(event, buttonLabel)}
                    className={
                        buttonLabel === activeButton
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
