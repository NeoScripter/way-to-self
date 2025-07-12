import useToggle from "@/hooks/use-toggle";
import { cn } from "@/lib/utils";
import { Transition } from "@headlessui/react";
import { XIcon } from "lucide-react";
import MenuBg from "@/assets/images/shared/mobile-nav-bg.webp";
import { Link } from "@inertiajs/react";
import PrimaryBtn from "../atoms/primary-btn";
import RedBtn from "../atoms/red-btn";

type UserHeaderProps = {
    className?: string;
}

export default function UserHeader({ className }: UserHeaderProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <header className={cn("flex items-center justify-between gap-x-5 overflow-y-auto border-b border-gray-200 text-white mx-7 lg:mx-14 xl:ml-27 xl:mr-23 2xl:ml-41 2xl:mr-28", className)}>
            <div className="font-cursive text-4xl sm:text-6xl mt-2.5 sm:mt-5 sm:mb-4 md:mt-7 md:mb-5 mb-2 ml-1 md:text-5xl lg:text-6xl">Мария Юданова</div>

            <NavMenu show={show} close={() => toggleShow(false)} />

            <MobileBtn onClick={() => toggleShow(true)} className="mt-2 md:hidden" />
        </header>

    )
}


type NavMenuProps = {
    className?: string;
    close: () => void;
    show: boolean;
}

function NavMenu({ className, close, show }: NavMenuProps) {
    return (
        <div className={cn("transition-transform overflow-y-auto max-h-screen h-200 duration-500 ease-in-out fixed bg-cover !bg-bottom-left bg-light-swamp top-0 left-0 right-0 z-10 md:static md:flex md:items-center md:justify-between md:h-auto md:!bg-none md:bg-transparent md:flex-1 md:gap-5", className, show ? "translate-x-0" : "translate-x-full md:translate-x-0")} style={{ backgroundImage: `url(${MenuBg})` }}>
            <header className="border-b border-gray-100 md:hidden px-5 py-4">
                <button onClick={close} className="cursor-pointer ml-auto size-10 block">
                    <XIcon className="text-gray-100 size-full" />
                </button>
            </header>
            <div className="font-cursive text-[18vw] my-[5vw] sm:text-8xl md:hidden text-center">Мария Юданова</div>

            <PrimaryBtn className="mx-auto text-xl md:text-xs xl:text-base md:mr-0 md:order-2" href="/">Личный кабинет</PrimaryBtn>

            <nav className="mt-15 mb-50 md:mt-0 md:mb-0 md:mx-auto">
                <ul className="space-y-15 text-xl md:text-sm lg:text-base text-center md:space-y-0 md:flex md:items-center md:justify-between md:gap-6 lg:gap-10 xl:gap-15">
                    <NavLink><Link href="/">Питание</Link></NavLink>
                    <NavLink><Link href="/">Душа</Link></NavLink>
                    <NavLink><Link href="/">Тело</Link></NavLink>
                    <NavLink><RedBtn href="/" className="mx-auto py-[0.3rem]">Магазин</RedBtn></NavLink>
                    <NavLink><Link href="/">Контакты</Link></NavLink>
                </ul>
            </nav>
        </div>
    )
}

type NavLinkProps = {
    children: React.ReactNode;
}

function NavLink({ children }: NavLinkProps) {
    return <li className="transition-colors duration-200 ease-in hover:text-very-bright-salad">{children}</li>;
}

type MobileBtnProps = {
    className?: string;
    onClick: () => void;
}

function MobileBtn({ className, onClick }: MobileBtnProps) {
    return (
        <button onClick={onClick} className={cn("group relative overflow-clip cursor-pointer w-8 h-4 sm:w-13 sm:h-6", className)}>
            <span className="shine-element block group-hover:animate-[shine_750ms]"></span>
            <svg
                fill="none"
                height="100%"
                viewBox="0 0 34 18"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M1 1H32"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
                <path
                    d="M10 9L32.4902 9"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
                <path
                    d="M17 17L32.5 17"
                    stroke="white"
                    strokeLinecap="round"
                    strokeOpacity="0.75"
                    strokeWidth="2"
                />
            </svg>
        </button>
    )
}

