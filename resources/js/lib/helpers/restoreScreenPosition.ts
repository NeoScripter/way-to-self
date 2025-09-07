export default function restoreScreenPosition() {
    window.addEventListener('popstate', () => {
        const offsetTop = window?.history?.state?.documentScrollPosition?.top;

        if (!offsetTop) return;

        setTimeout(() => {
            window.scrollTo({
                top: offsetTop,
                behavior: 'instant',
            });
        }, 100);
    });
}
