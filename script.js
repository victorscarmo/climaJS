document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()

    let input = document.querySelector('#searchInput').value

    if (input !== '') {
        clearInfo()
        showWarning('Carregando...')

        let key = '402e1ee796dc7486ca3ad715333434e8'
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${key}&units=metric&lang=pt_br`

        let results = await fetch(url)
        let json = await results.json()

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                feel: json.main.feels_like,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })
        } else {
            clearInfo()
            showWarning('Não encontramos esta localização.')
        }
    } else {
        clearInfo()
    }
})

const showInfo = (json) => {
    showWarning('')

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`
    document.querySelector('.feelInfo').innerHTML = `${json.feel} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    document.querySelector('.resultado').style.display = 'block'
}

const clearInfo = () => {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

const showWarning = (msg) => {
    document.querySelector('.aviso').innerHTML = msg
}

