import { format, differenceInDays, differenceInHours, differenceInMinutes } from "date-fns";

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

export const convertHours = (hours) => {
	if (hours < 24) {
		return `${hours} hours`;
	}

	const days = hours / 24;
	if (days < 7) {
		return `${Math.floor(days)} days`;
	}

	const weeks = days / 7;
  if (weeks < 4) {
    return `${Math.floor(weeks)} weeks`;
  }

  const months = weeks / 4;

	return `${Math.floor(months)} months`;
};
