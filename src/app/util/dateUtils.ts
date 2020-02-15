import moment from "moment";

/**
 * Returns the difference between two Dates in minutes and seconds.
 * @param start - The starting date.
 * @param end - The ending date.
 */
const getDifference = (start: Date, end: Date) => {
    const duration = moment.duration(moment(end).diff(start));
    const minutes = duration.minutes();
    duration.subtract(moment.duration(minutes, "minutes"));
    const seconds = duration.seconds();
    return { minutes, seconds };
};

export { getDifference };
