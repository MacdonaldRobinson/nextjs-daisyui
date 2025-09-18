import Link from "next/link";
import { MouseEventHandler } from "react";

export type TNavBar = {
    onMouseMenuClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};
const NavBar = ({ onMouseMenuClick }: TNavBar) => {
    const handleMainMenuButtonClick: MouseEventHandler<HTMLButtonElement> = (
        event
    ) => {
        onMouseMenuClick(event);
    };
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-none">
                <button
                    className="btn btn-square btn-ghost"
                    onClick={handleMainMenuButtonClick}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        {" "}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>{" "}
                    </svg>
                </button>
            </div>
            <div className="flex-1">
                <Link href={"/"} className="btn btn-ghost text-xl">
                    daisyUI
                </Link>
            </div>
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="inline-block h-5 w-5 stroke-current"
                    >
                        {" "}
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        ></path>{" "}
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
