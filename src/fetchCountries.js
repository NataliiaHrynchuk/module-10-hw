const BASE_URL = 'https://restcountries.com/v3.1/name/'; 

export const fetchCountries = ({ name }) => {
    console.log(name);
    
    return fetch(`${BASE_URL}${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            return response.json();
        })
        
        .catch(error => {
            console.log(error);
        });
    }
