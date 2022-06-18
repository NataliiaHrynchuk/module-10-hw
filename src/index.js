import './css/styles.css';
import { fetchCountries } from './fetchCountries';

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
    console.log(value);
    name = value;
    fetchCountries({ name }).then(() => console.log());
        
    
}

const render = (name) => {
    //render new list here
    console.log(name);
};
refs.input.addEventListener('input', onSearch);