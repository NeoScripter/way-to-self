export default function scrollTo(selector: string) {
    const element = document.querySelector(selector);

    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: "nearest" });
}
