export const getFullDay = (date: string): string => {
    const dateObj = new Date(date);
    return `${dateObj.getDate()}-${
        dateObj.getMonth() + 1
    }-${dateObj.getFullYear()}`;
};

export const isDateExpired = (time: string, date: Date) => {
    const newDate = new Date(date).toISOString().split("T")[0];
    const currenttime = new Date().getTime();
    const oldTime = new Date(newDate + " " + time).getTime();
    // if current time is greater than time of the ticket and current date is greater than date of the ticket
    if (currenttime > oldTime) {
        return true;
    }
    return false;
};
