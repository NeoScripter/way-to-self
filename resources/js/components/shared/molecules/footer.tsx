import Facebook from '@/assets/svgs/facebook.svg';
import Instagram from '@/assets/svgs/instagram.svg';
import Logo from '@/components/user/atoms/logo';
import Email from '@/components/user/icons/email';
import Whatsapp from '@/components/user/icons/whatsapp';
import { cn } from '@/lib/utils';

type FooterProps = {
    className?: string;
};

const AddressLinks = () => (
    <address className="mt-4 mb-7 text-sm not-italic sm:mt-6 sm:mb-8.5 lg:text-base">
        <ul className="flex flex-col items-center justify-center gap-2 sm:items-start sm:gap-4">
            <li>
                <a
                    href="https://wa.me/79876543210"
                    target="_blank"
                    className="group flex h-full items-center gap-2"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp номер +7 9876543210"
                >
                    <Whatsapp
                        className="size-5 group-hover:text-very-bright-salad"
                        aria-hidden="true"
                    />
                    <span className="transition-colors duration-200 ease-in group-hover:text-white">
                        +7 9876543210
                    </span>
                </a>
            </li>

            <li>
                <a
                    href="mailto:example@email.com"
                    className="group flex h-full items-center gap-2"
                    aria-label="Отправить письмо на example@email.com"
                >
                    <Email
                        className="size-5 group-hover:text-very-bright-salad"
                        aria-hidden="true"
                    />
                    <span className="transition-colors duration-200 ease-in group-hover:text-white">
                        example@email.com
                    </span>
                </a>
            </li>
        </ul>
    </address>
);

const SocialLinks = () => (
    <nav
        className="mb-8.5"
        aria-label="Социальные сети"
    >
        <ul className="flex items-center justify-center gap-1.5 sm:justify-start lg:gap-2.5">
            <li>
                <a
                    href=""
                    className="flex size-7.5 items-center justify-center rounded-sm bg-bright-salad transition-colors duration-200 ease-in hover:bg-very-bright-salad lg:size-10.5"
                    aria-label="Facebook"
                >
                    <img
                        src={Facebook}
                        alt="Facebook"
                        className="size-3/5 lg:size-2/3"
                    />
                </a>
            </li>
            <li>
                <a
                    href=""
                    className="flex size-7.5 items-center justify-center rounded-sm bg-bright-salad transition-colors duration-200 ease-in hover:bg-very-bright-salad lg:size-10.5"
                    aria-label="Instagram"
                >
                    <img
                        src={Instagram}
                        alt="Instagram"
                        className="size-3/5 lg:size-4/5"
                    />
                </a>
            </li>
        </ul>
    </nav>
);

export default function Footer({ className }: FooterProps) {
    return (
        <footer
            role="contentinfo"
            aria-label="Подвал сайта"
            id="footer"
            className={cn(
                'relative z-20 bg-footer-bg px-15 py-9 text-footer-text sm:px-25 sm:pt-12 sm:pb-20',
                className,
            )}
        >
            <Logo className="text-center text-4xl text-white sm:text-left sm:text-6xl" />

            <AddressLinks />

            <SocialLinks />

            <p
                className="text-center text-xs sm:text-left sm:text-base lg:text-lg"
                role="contentinfo"
            >
                Мария Юданова © Все права защищены
            </p>
        </footer>
    );
}
