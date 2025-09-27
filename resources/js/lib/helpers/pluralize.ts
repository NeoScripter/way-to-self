const pluralRu = new Intl.PluralRules('ru');

export default function pluralizeRu(
    count: number,
    one: string,
    few: string,
    many: string,
): string {
    const forms: Record<Intl.LDMLPluralRule, string> = {
        zero: many,
        one,
        two: many,
        few,
        many,
        other: many,
    };

    const category = pluralRu.select(count);
    return `${forms[category]}`;
}

