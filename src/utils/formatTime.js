import { format, formatDistanceToNow, formatDistanceToNowStrict } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

// ----------------------------------------------------------------------

export const defaultDate = 'dd.MM.yyyy';

export function fDate(date) {
  return format(new Date(date), 'dd.MM.yyyy', {
    locale: ruLocale
  });
}

export function fPeriod(date) {
  return formatDistanceToNowStrict(new Date(date), { locale: ruLocale });
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm:ss', { locale: ruLocale });
}

export function fDateWeekDay(date) {
  return format(new Date(date), 'dd MMM iiii', { locale: ruLocale });
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p', {
    locale: ruLocale
  });
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: ruLocale
  });
}

export function fTime(date) {
  return format(new Date(date), 'HH:mm');
}
