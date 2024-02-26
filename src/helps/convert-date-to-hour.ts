

export const convertDateToHours = (date: string) => {

    const currentTime = new Date()

    const postCreatedAt = new Date(date)

    const timeDifference = currentTime.getTime() - postCreatedAt.getTime();

    // covert to minutes
    const minutesDifference = timeDifference / (1000 * 60);
    if (minutesDifference <= 1) {
        return 'Vừa xong'
    } else if (minutesDifference <= 59) {
        return Math.floor(minutesDifference) + ' phút'
    } else {
        // covert minutes to hours
        const convertMinutesToHours = Math.floor(minutesDifference / 60)
        if (convertMinutesToHours <= 24) {
            return convertMinutesToHours + ' giờ'
        } else {
            return Math.floor(convertMinutesToHours / 24) + ' ngày'
        }
    }

}