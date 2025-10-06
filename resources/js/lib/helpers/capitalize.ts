export default function capitalize(word: string | undefined) {
    if (word == null) return;

    return word.slice(0, 1).toUpperCase() + word.slice(1);
}
