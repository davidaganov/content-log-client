const keys: Record<string, string> = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "j",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "shch",
  ы: "y",
  э: "e",
  ю: "u",
  я: "ya",
  ь: "",
  ъ: "",
  " ": "-",
  "№": ""
}

export const useTransliterate = (word: string): string => {
  return word
    .split("")
    .map((letter) => {
      const lowLetter = letter.toLowerCase()
      const en = keys[lowLetter] ?? letter

      return en
    })
    .join("")
}
