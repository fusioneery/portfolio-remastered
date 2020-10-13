import { format } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'
const dateFNSLocales = { ru, en: enUS }
export const getDateTitle = (date, locale) => {
  return format(
    new Date(date),
    locale === 'ru' ? "d MMMM y 'г.'" : 'LLLL d, y',
    { locale: dateFNSLocales[locale] }
  )
}
