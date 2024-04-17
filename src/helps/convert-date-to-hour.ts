export const convertDateToHours = (dateString: string ) => {
    const currentTime = new Date();
    const postCreatedAt = new Date(dateString);
    const timeDifference = currentTime.getTime() - postCreatedAt.getTime();

    // Chuyển đổi thành phút
    const minutesDifference = timeDifference / (1000 * 60);

    if (minutesDifference <= 1) {
        return 'Vừa xong';
    } else if (minutesDifference < 60) {
        return Math.floor(minutesDifference) + ' phút trước';
    } else {
        // Chuyển đổi phút thành giờ
        const hoursDifference = Math.floor(minutesDifference / 60);
        if (hoursDifference < 24) {
            return hoursDifference + ' giờ trước';
        } else {
            // Chuyển đổi giờ thành ngày
            const daysDifference = Math.floor(hoursDifference / 24);
            if (daysDifference < 30) {
                return daysDifference + ' ngày trước';
            } else {
                // Chuyển đổi ngày thành tháng
                const monthsDifference = Math.floor(daysDifference / 30);
                if (monthsDifference < 12) {
                    return monthsDifference + ' tháng trước';
                } else {
                    // Chuyển đổi tháng thành năm
                    const yearsDifference = Math.floor(monthsDifference / 12);
                    return yearsDifference + ' năm trước';
                }
            }
        }
    }
};
