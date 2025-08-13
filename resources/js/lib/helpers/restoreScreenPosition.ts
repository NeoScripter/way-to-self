export default function restoreScreenPosition() {
    window.addEventListener('popstate', () => {
        const offsetTop = window.history.state.documentScrollPosition.top;
        setTimeout(() => {
            window.scrollTo({
                top: offsetTop,
                behavior: 'instant',
            });
        }, 100);
    });
}
