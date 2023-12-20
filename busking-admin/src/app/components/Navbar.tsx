import { useState, useEffect } from "react";
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    IconButton,
    Collapse,
    Select,
    Switch,
    Option
} from "@material-tailwind/react";
import setIsBusking from "../firebase/setIsBusking";
import { auth } from "../firebase/auth/auth";
import { signOut } from "firebase/auth";

export default function Example() {
    const [openNav, setOpenNav] = useState(false);
    const [isBusking, setBusking] = useState(true);

    useEffect(() => {
        window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
    }, []);

    const navList = (
        <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a href="/./mysongs" className="flex items-center">
                    My Songs
                </a>
            </Typography>
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <a className="flex items-center" onClick={() => {
                    try {
                        signOut(auth);
                    } catch (error) {
                        console.log(error);
                    }
                }}>
                    Sign Out
                </a>
            </Typography>
        </ul>
    );

    return (
        <Navbar
            className={"mx-auto max-w-screen-xl py-4 px-6 lg:px-8 lg:py-4 rounded-none outline-2 outline outline-brown-700 bg-blue-gray-300"}
        >

            <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
                <Typography
                    as="a"
                    href="/"
                    className="mr-4 cursor-pointer py-1.5 font-extrabold text-xl text-white"
                >
                    BUSKINGKHAI- ADMIN
                </Typography>
                <Switch defaultChecked
                    onChange={() => {
                        setIsBusking(isBusking);
                        setBusking(!isBusking);

                    }} id="busk"></Switch>

                <div className="hidden lg:block">{navList}</div>

                <IconButton
                    variant="text"
                    className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden text-brown-100"
                    ripple={false}
                    onClick={() => setOpenNav(!openNav)}
                >
                    {openNav ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </IconButton>
            </div>
            <Collapse open={openNav}>
                <div className="container mx-auto">
                    {navList}

                </div>
            </Collapse>
        </Navbar>
    );

}