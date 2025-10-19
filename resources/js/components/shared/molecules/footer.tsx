import Facebook from '@/assets/svgs/facebook.svg';
import Instagram from '@/assets/svgs/instagram.svg';
import Logo from '@/components/user/atoms/logo';
import Email from '@/components/user/icons/email';
import { cn } from '@/lib/utils';
import { Admin } from '@/types/admin';
import { Link, usePage } from '@inertiajs/react';

type FooterProps = {
    className?: string;
};

const AddressLinks: React.FC<{ email: string }> = ({ email }) => (
    <address className="mt-4 mb-7 text-sm not-italic sm:mt-6 sm:mb-8.5 lg:text-base">
        <ul className="flex flex-col items-center justify-center gap-2 sm:items-start sm:gap-4">
            <li>
                <a
                    href={`mailto:${email}`}
                    className="group flex h-full items-center gap-2"
                    aria-label="Отправить письмо на example@email.com"
                >
                    <Email
                        className="size-5 group-hover:text-very-bright-salad"
                        aria-hidden="true"
                    />
                    <span className="transition-colors duration-200 ease-in group-hover:text-white">
                        {email}
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
            <InfoIcon
                key={'Facebook'}
                image={Facebook}
                alt="Facebook"
            />
            <InfoIcon
                key={'Instagram'}
                image={Instagram}
                alt="Instagram"
            />
        </ul>
    </nav>
);

export default function Footer({ className }: FooterProps) {
    const { admin } = usePage<{ admin: Admin }>().props;

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

            <AddressLinks email={admin.email} />

            <SocialLinks />

            <div className="space-y-2">
                <InfoText>
                    {admin.name} {admin.surname} © Все права защищены
                </InfoText>
                <InfoText>ИНН: 772573178009</InfoText>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center gap-x-5 gap-y-2">
                <InfoLink
                    routeName={route('legal.offer')}
                    label="Публичная оферта"
                />
                <InfoLink
                    routeName={route('legal.policy')}
                    label="Политика конфиденциальности"
                />
            </div>
        </footer>
    );
}

const InfoText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <p
            className="text-center text-xs sm:text-left sm:text-base lg:text-lg"
            role="contentinfo"
        >
            {children}
        </p>
    );
};

const InfoLink: React.FC<{ routeName: string; label: string }> = ({
    label,
    routeName,
}) => {
    return (
        <Link
            prefetch
            href={routeName}
            className="ease text-center text-xs underline underline-offset-3 transition-colors duration-200 hover:text-bright-salad sm:text-left sm:text-base lg:text-lg"
        >
            {label}
        </Link>
    );
};

const InfoIcon: React.FC<{
    routeName?: string;
    image: string;
    alt: string;
}> = ({ image, alt, routeName = '' }) => {
    return (
        <li>
            <a
                href={routeName}
                className="flex size-7.5 items-center justify-center rounded-sm bg-bright-salad transition-colors duration-200 ease-in hover:bg-very-bright-salad lg:size-10.5"
                aria-label="Facebook"
            >
                <img
                    src={image}
                    alt={alt}
                    className="size-3/5 lg:size-2/3"
                />
            </a>
        </li>
    );
};
