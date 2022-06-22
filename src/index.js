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
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
    refs.countryList.classList.remove("big");
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
                console.log(svg, official);
                refs.countryList.insertAdjacentHTML("beforeend", renderCountriesList(svg, official));
            });
            }
            if (countries.length === 1) {
                
                countries.map((country) => {
                    const {
                        flags: { svg },
                        name: { official },
                        capital,
                        population,
                        languages
                    
                    } = country;
                    console.log(official, capital, population, svg, languages);
                    refs.countryList.innerHTML = renderCountriesList(svg, official);
                    refs.countryList.classList.add("big");
                    refs.countryInfo.innerHTML = renderCountriesInfo(capital, population, languages);
                });
            }
        });
        
    
}

const renderCountriesList = (svg, official) => {
   return `<li>
   <div class="country-name">
     <img src="${svg}" alt="flag" width="100">
     <h2 class="country-title">${official}</h2>
   </div>
 </li>`;
};

function renderCountriesInfo(capital, population, languages )  {
    const languagesName = Object.values(languages).join(', ');
    console.log(languagesName);
    
    return `<p class="country-text"><span>Capital:</span>${capital}</p>
            <p class="country-text"><span>Population:</span>${population}</p>
            <p class="country-text"><span>Languages:</span>${languagesName}</p>`
}
refs.input.addEventListener('input', _.debounce(onSearch, DEBOUNCE_DELAY));