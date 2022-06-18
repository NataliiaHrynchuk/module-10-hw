const BASE_URL = 'https://restcountries.com/v3.1/name/'; 
export const fetchCountries = ({name}) =>
    
    axios.get(`${BASE_URL}${name}`);
    
