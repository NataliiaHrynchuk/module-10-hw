import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;
const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}
let name = '';
const onSearch = (event) => {
    const { value } = event.target;
    event.preventDefault();
    
    if (!value) return;
    // console.log(value);
    name = value.trim();
    // console.log(name);
    fetchCountries({ name })
        .then((countries) => {
           console.log(countries.length);
            if (countries.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
                return;
            }
            if (countries.length > 1 && countries.length < 11) {
                countries.map(country => {
                    const {
                        flags: { svg },
                        name: { official },
                    
                    } = country;
                console.log(svg, official)});
                
            }
            if (countries.length === 1) {
                countries.map(country => console.log(country.name.official, country.capital, country.population, country.flags.svg, country.languages));
            }
        });
        
    
}

const render = (name) => {
    //render new list here
    console.log(name);
};
refs.input.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));