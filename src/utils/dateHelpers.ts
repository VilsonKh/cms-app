import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";
import { TFunction } from "i18next";
import { useTransition } from "react";

export const formatDate = (date: Date | string, formatStr: string): string => {
	return format(new Date(date), formatStr);
};

export const relativeTime = (date: Date | string): string => {
	const now = new Date();
	const inputDate = new Date(date);

	const minutesDifference = differenceInMinutes(now, inputDate);
	if (minutesDifference < 60) {
		return `${minutesDifference} minutes`;
	}

	const hoursDifference = differenceInHours(now, inputDate);
	if (hoursDifference < 24) {
		return `${hoursDifference} hours`;
	}

	const daysDifference = differenceInDays(now, inputDate);
	return `${daysDifference} days`;
};

const getPluralKey = (count: number, baseKey: string) => {
  if (count === 1) return `${baseKey}_1`;
  if (count >= 2 && count <= 4) return `${baseKey}_2_4`;
  return `${baseKey}_5_plus`;
};

export const convertHours = (hours: number, t: TFunction) => {
  if (hours < 24) {
    const key = getPluralKey(hours, "time.hours");
    return t(key, { count: hours });
  } else if (hours < 24 * 7) {
    const days = Math.floor(hours / 24);
    const key = getPluralKey(days, "time.days");
    return t(key, { count: days });
  } else if (hours < 24 * 30) {
    const weeks = Math.floor(hours / (24 * 7));
    const key = getPluralKey(weeks, "time.weeks");
    return t(key, { count: weeks });
  } else {
    const months = Math.floor(hours / (24 * 30));
    const key = getPluralKey(months, "time.months");
    return t(key, { count: months });
  }
};