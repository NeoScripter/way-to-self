
export function shortenDescription(desc: string, limit = 15) {
    return desc.split(" ")
        .slice(0, limit)
        .join(" ") + (desc.split(" ").length > limit ? "..." : "");
}
