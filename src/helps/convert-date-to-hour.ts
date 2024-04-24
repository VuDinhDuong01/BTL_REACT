export const convertDateToHours = (dateString: string) => {
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

export function formatDate(dateString: string) {
    const date = new Date(dateString);

    // Lấy thông tin ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    // Lấy thông tin giờ, phút, giây
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Trả về chuỗi ngày tháng năm, giờ phút giây
    return `${hours}:${minutes}:${seconds} ${year}-${month}-${day}`;
}