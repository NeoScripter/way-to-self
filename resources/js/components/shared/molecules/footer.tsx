import { cn } from "@/lib/utils";
import Logo from "@/components/user/atoms/logo"
import Whatsapp from "@/components/user/icons/whatsapp";
import Email from "@/components/user/icons/email";
import Facebook from "@/assets/svgs/facebook.svg";
import Instagram from "@/assets/svgs/instagram.svg";

type FooterProps = {
    className?: string;
}

const AddressLinks = () => (
    <address className="not-italic mt-4 sm:mt-6 mb-7 sm:mb-8.5 text-sm lg:text-base">
        <ul className="gap-2 flex flex-col justify-center items-center sm:items-start sm:gap-4">
            <li>
                <a
                    href="https://wa.me/79876543210"
                    target="_blank"
                    className="flex items-center gap-2 h-full group"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp номер +7 9876543210"
                >
                    <Whatsapp className="size-5 group-hover:text-very-bright-salad" aria-hidden="true" />
                    <span className="group-hover:text-white transition-colors duration-200 ease-in">+7 9876543210</span>
                </a>
            </li>

            <li>
                <a
                    href="mailto:example@email.com"
                    className="flex items-center gap-2 h-full group"
                    aria-label="Отправить письмо на example@email.com"
                >
                    <Email className="size-5 group-hover:text-very-bright-salad" aria-hidden="true" />
                    <span className="group-hover:text-white transition-colors duration-200 ease-in">example@email.com</span>
                </a>
            </li>
        </ul>
    </address>

)

const SocialLinks = () => (
    <nav className="mb-8.5" aria-label="Социальные сети">
        <ul className="flex items-center justify-center gap-1.5 lg:gap-2.5 sm:justify-start">
            <li>
                <a
                    href=""
                    className="flex items-center justify-center rounded-sm bg-bright-salad size-7.5 transition-colors duration-200 ease-in hover:bg-very-bright-salad lg:size-10.5"
                    aria-label="Facebook"
                >
                    <img src={Facebook} alt="Facebook" className="size-3/5 lg:size-2/3" />
                </a>
            </li>
            <li>
                <a
                    href=""
                    className="flex items-center justify-center rounded-sm bg-bright-salad size-7.5 transition-colors duration-200 ease-in hover:bg-very-bright-salad lg:size-10.5"
                    aria-label="Instagram"
                >
                    <img src={Instagram} alt="Instagram" className="size-3/5 lg:size-4/5" />
                </a>
            </li>
        </ul>
    </nav>

)

export default function Footer({ className }: FooterProps) {

    return (
        <footer
            role="contentinfo"
            aria-label="Подвал сайта"
            id="footer"
            className={cn("bg-footer-bg text-footer-text relative z-20 py-9 px-15 sm:pt-12 sm:pb-20 sm:px-25", className)}
        >
            <Logo className="text-4xl text-center text-white sm:text-left sm:text-6xl" />

            <AddressLinks />

            <SocialLinks />

            <p className="text-xs text-center sm:text-left sm:text-base lg:text-lg" role="contentinfo">Мария Юданова © Все права защищены</p>
        </footer>
    )
}
