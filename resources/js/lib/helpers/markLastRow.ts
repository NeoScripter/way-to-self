export default function markLastRow(grid: HTMLUListElement) {
    const items = Array.from(grid.children) as HTMLElement[];

    items.forEach((el) => el.classList.remove('first-row'));

    const firstTop = items.at(0)?.offsetTop;
    items
        .filter((el) => el.offsetTop === firstTop)
        .forEach((el) => el.classList.add('first-row'));
}
