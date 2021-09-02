import {
  add as fnAdd, format as fnFormat,
  fromUnixTime as fnFromUnixTime,
  isDate as fnIsDate, parse as fnParse,
  sub as fnSub,
  intervalToDuration,
} from 'date-fns';
import { vi } from 'date-fns/locale';
import { iife } from 'utils/helpers';

export default function DateFns (raw, rawPattern) {
  /**
   * raw: string | Date | null
   * rawPattern: use for raw string
   */
  let date = iife(() => {
    try {
      if (!raw) return new Date();
      if (typeof raw === 'number') return fnFromUnixTime(raw);
      if (fnIsDate(raw)) return raw;
      return fnParse(raw, rawPattern, new Date());
    } catch { return null; }
  });

  function isValid () {
    return fnIsDate(date);
  }

  function format (pattern = 'yyyy-MM-dd', toNumber = false) {
    if (!isValid()) return 'Invalid date';
    const str = fnFormat(date, pattern, { locale: vi });
    const shouldParseToNumber = toNumber && !Number.isNaN(parseInt(str));
    return shouldParseToNumber ? parseInt(str) : str;
  }

  function getDay (toNumber) { return format('dd', toNumber); }
  function getMonth (toNumber) { return format('MM', toNumber); }
  function getYear (toNumber) { return format('yyyy', toNumber); }
  function getHour (toNumber) { return format('HH', toNumber); }
  function getMinute (toNumber) { return format('mm', toNumber); }
  function getSecond (toNumber) { return format('ss', toNumber); }

  function add (duration, token) {
    if (isValid()) date = fnAdd(date, { [token]: duration });
    return this;
  }

  function subtract (duration, token) {
    if (isValid()) date = fnSub(date, { [token]: duration });
    return this;
  }

  function getDuration (from = 0, to = 0) {
    const duration = intervalToDuration({ start: from, end: to });
    const tick = Math.round((to - from) / 1000 % 1 * 1000);
    return { ...duration, milliseconds: tick };
  }

  return {
    raw: date,
    isValid,
    format, getDay, getMonth, getYear, getHour, getMinute, getSecond,
    add, subtract,
    getDuration,
  };
}
