const userInfo = document.getElementById('userInfo')
const countryInfo = document.getElementById('countryInfo')
const currencyInfo = document.getElementById('exchangeRate')
const newsInfo = document.getElementById('newsInfo')

const userElements = {
  profilePicture: userInfo.querySelector('#profilePicture'),
  userName: userInfo.querySelector('#userName'),
  gender: userInfo.querySelector('#gender'),
  age: userInfo.querySelector('#age'),
  dateOfBirth: userInfo.querySelector('#dateOfBirth'),
  city: userInfo.querySelector('#city'),
  country: userInfo.querySelector('#country'),
  address: userInfo.querySelector('#address')
}

const countryElements = {
    flag: countryInfo.querySelector('#flag'),
    name: countryInfo.querySelector('#name'),
    capital: countryInfo.querySelector('#capital'),
    currency: countryInfo.querySelector('#currency'),
    languages: countryInfo.querySelector('#languages')
}

const currencyElements = {
    USD: currencyInfo.querySelector('#USD'),
    KZT: currencyInfo.querySelector('#KZT')
}

const newsElements = {
    headline: newsInfo.querySelector('#headline'),
    newsImg: newsInfo.querySelector('#newsImg'),
    description: newsInfo.querySelector('#description'),
    source: newsInfo.querySelector('#source')
}

document.getElementById('getRandomUser').addEventListener('click', async (e) => {
    try {
        // Fetch random user
        const responseUser = await fetch('http://localhost:3000/randomuser')

        if (!responseUser.ok) {
            throw new Error(`HTTP error (randomuser API) ${responseUser.status}`)
        }

        const randomUser = await responseUser.json()

        const fullName = randomUser.name.first + ' ' + randomUser.name.last
        const dob = new Date(randomUser.dob.date)
        const age = "Age: " + randomUser.dob.age
        const address = randomUser.location.street.name + ' ' + randomUser.location.street.number

        userInfo.style.display = 'block'

        userElements.profilePicture.src = randomUser.picture.large
        userElements.userName.innerText = fullName
        userElements.gender.innerText = randomUser.gender
        userElements.age.innerText = age
        userElements.dateOfBirth.innerText = new Intl.DateTimeFormat('en-GB').format(dob)
        userElements.country.innerText = randomUser.location.country + ','
        userElements.city.innerText = randomUser.location.city + ','
        userElements.address.innerText = address

        // Fetch country
        const responseCountry = await fetch(`http://localhost:3000/country?country=${randomUser.location.country}`)

        if (!responseCountry.ok) {
            throw new Error(`HTTP error (restcountries API) ${responseCountry.status}`)
        }

        const country = await responseCountry.json()

        let languages = ""
        const langCount = Object.keys(country.languages).length
        let i = 1

        for (const key in country.languages) {
            languages += `${country.languages[key]}`
            
            if (i != langCount) {
                languages += ', '
            }
            i += 1
        }

        const currency = Object.values(country.currencies)[0].name
        const currencyCode = Object.keys(country.currencies)[0]
        const countryCca2 = country.cca2.toLowerCase()

        countryInfo.style.display = 'block'

        countryElements.flag.src = country.flags.png
        countryElements.name.innerText = country.name.common
        countryElements.capital.innerHTML = country.capital
        countryElements.languages.innerHTML = languages
        countryElements.currency.innerText = 'Currency: ' + currency

        // Fetch currency
        const responseCurrency = await fetch(`http://localhost:3000/currency?currency=${currencyCode}`)

        if (!responseCurrency.ok) {
            throw new Error(`HTTP error (exchangerate API) ${responseCurrency.status}`)
        }

        const dataCurrency = await responseCurrency.json()
        
        const USD = `1 ${dataCurrency.base_code} = ${dataCurrency.conversion_rates.USD.toFixed(2)} USD`
        const KZT = `1 ${dataCurrency.base_code} = ${dataCurrency.conversion_rates.KZT.toFixed(2)} KZT`
        
        currencyElements.USD.innerText = USD
        currencyElements.KZT.innerText = KZT

        // Fetch news
        const responseNews = await fetch(`http://localhost:3000/news?country=${countryCca2}`)

        if (!responseNews.ok) {
            throw new Error(`HTTP error (newsapi API) ${responseNews.status}`)
        }

        const dataNews = await responseNews.json()

        console.log(dataNews)

        newsInfo.style.display = 'block'

        if (dataNews.articles.length > 0) {
            const news = dataNews.articles[0]

            newsElements.headline.innerText = news.title
            newsElements.description.innerText = news.description
            newsElements.newsImg.src = news.urlToImage
            newsElements.source.innerText = 'Source'
            newsElements.source.href = news.url
        }else {
            newsElements.headline.innerText = `No news from ${country.name.common}`
        }

    } catch (err) {
        console.error("Fetch error:", err)
    }
});