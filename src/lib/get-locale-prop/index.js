export const getLocaleProp = ({ obj, locale, fallbackLocale }) => {
  const res = obj[locale] || obj[fallbackLocale]
  if (!res)
    console.error(
      `Can't get any locale prop from obj ${obj}, locale: ${locale}`
    )
  return res
}
