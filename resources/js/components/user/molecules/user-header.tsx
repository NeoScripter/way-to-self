import useToggle from "@/hooks/use-toggle";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import MobileBtnSvg from "@/assets/svgs/mobile-btn.svg";
import MenuBg from "@/assets/images/shared/mobile-nav-bg.webp";
import { Link } from "@inertiajs/react";
import PrimaryBtn from "../atoms/primary-btn";
import RedBtn from "../atoms/red-btn";
import Logo from "../atoms/logo";

type UserHeaderProps = {
    className?: string;
}

export default function UserHeader({ className }: UserHeaderProps) {
    const [show, toggleShow] = useToggle(false);

    return (
        <header className={cn("flex z-100 backdrop-blur-lg sticky top-0 items-center justify-between gap-x-5 border-b border-gray-200 text-white px-7 md:px-0 md:mx-7 md:relative lg:mx-14 xl:ml-27 xl:mr-23 2xl:ml-41 2xl:mr-28", className)}>

            <div aria-hidden="true" className={cn("absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-screen -z-10", className)}></div>

            <Logo className="text-4xl sm:text-6xl mt-2.5 sm:mt-5 sm:mb-4 md:mt-7 md:mb-5 mb-2 ml-1 md:text-4xl lg:text-6xl" />

            <NavMenu show={show} close={() => toggleShow(false)} />

            <MobileBtn
                onClick={() => toggleShow(true)}
                className="mt-2 md:hidden"
                aria-expanded={show}
                aria-controls="mobile-navigation"
            />
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
        <div
            className={cn("transition-transform overflow-y-auto max-h-screen h-200 duration-500 ease-in-out fixed bg-cover !bg-bottom-left bg-light-swamp top-0 left-0 right-0 z-10 md:static md:flex md:items-center md:justify-between md:h-auto md:!bg-none md:bg-transparent md:flex-1 md:gap-5", className, show ? "translate-x-0" : "translate-x-full md:translate-x-0")}
            id="mobile-navigation"
            style={{ backgroundImage: `url(${MenuBg})` }}
            role="dialog"
            aria-modal="true"
            aria-label="Навигационное меню">
            <header
                className="border-b border-gray-100 md:hidden px-5 py-4">
                <button
                    aria-label="Закрыть меню навигации"
                    onClick={close}
                    className="cursor-pointer ml-auto size-10 block">
                    <XIcon className="text-gray-100 size-full" />
                </button>
            </header>
            <Logo className="text-[18vw] my-[5vw] sm:text-8xl md:hidden text-center" />

            <PrimaryBtn className="mx-auto text-xl md:text-xs shrink-0 xl:text-base md:mr-0 md:order-2" href="/">Личный кабинет</PrimaryBtn>

            <nav
                aria-label="Основная навигация"
                className="mt-15 mb-50 md:mt-0 md:mb-0 md:mx-auto">
                <ul className="space-y-15 text-xl md:text-sm xl:text-base text-center md:space-y-0 md:flex md:items-center md:justify-between md:gap-6 lg:gap-10 xl:gap-15">
                    <NavLink><Link href={route('home')}>О чем</Link></NavLink>
                    <NavLink><Link href="/">Тарифы</Link></NavLink>
                    <NavLink><Link href={route('user.articles.index')}>Новости</Link></NavLink>
                    <NavLink><RedBtn href="/" className="mx-auto py-[0.3rem]">Магазин</RedBtn></NavLink>
                    <NavLink><a href="#footer">Контакты</a></NavLink>
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
            <img src={MobileBtnSvg} alt="" className="size-full object-center object-contain" />
            <span className="sr-only">Открыть меню навигации</span>
        </button>
    )
}

