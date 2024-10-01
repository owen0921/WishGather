import Lunar from '@tony801015/chinese-lunar';


// Function to format a date to 'YYYY-MM-DD'
export const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split('T')[0];   
};

// Function to convert a solar (gregorian) date to a lunar date
export const convertSolarDateToLunarDate = (date) => {
    const [year, month, day] = formatDate(date).split('-');
    const lunarData = Lunar(year, month, day).getJson(); // Assuming Lunar is a global object or imported utility
    return `${lunarData.lunarMonth}${lunarData.lunarDay}`;
};