export const API_URL = 'http://localhost:2341/api';
export const API_URL_IMG = 'http://localhost:2341';
export const capitalizeFirstWord = (phrase) => {
    return phrase
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
export const formatRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
        { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }
    ).format(money);
}
export const formatDateIndo = (tanggal) => {
    return new Date(tanggal).toLocaleDateString('id-ID')
}
export const countDays = (start_date, end_date) => {
    const diff = new Date(end_date) - new Date(start_date)
    const days = (diff / 86400000);
    return days;
}
