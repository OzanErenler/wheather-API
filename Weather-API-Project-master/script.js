const city_btn = $('.city-btn'),
    
   
    city_form = $('.city-form'),
    
  
    city_input = $('#city-input'),
    long_input = $('#long-input'),
    lat_input = $('#long-input'),
    
    
    city_form_btn = $('.city-form-btn'),
   
   
    mykey = 'b9cfb1a798655c235698594be2c2a4ed',
    days = 6,
    date = new Date(),
    newDate = date.toDateString(),
    go_back_btn = $('.go-back');
    

    setInterval(myTimer, 1000);

function myTimer() {
  const d = new Date();
  document.getElementById("time").innerHTML = d.toLocaleTimeString();
}

city_btn.click(() => {
    city_form.css({
        left: "0",
        opacity: "1",
        visibility: "visible",
        transition: "all 0.5s",
    });
   
});





go_back_btn.click(() => {
    $('.choice-section').css({
        opacity: "1",
        visibility: "visible",
        zIndex: "1",
        transition: "all 0.5s",
    });
    $('section>header').css({
        opacity: "0",
        visibility: "hidden",
        zIndex: "-1",
        transition: "all 0.5s",
    });
});

navigator.geolocation.getCurrentPosition((position) => {
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=${days}&appid=${mykey}&units=metric`,
        method: "GET",
        cache: false,
        success: function (data) {
            $('.choice-section').css({
                opacity: "0",
                visibility: "hidden",
                zIndex: "-1",
                transition: "all 0.5s",
            });
            $('section>header').css({
                opacity: "1",
                visibility: "visible",
                zIndex: "1",
                transition: "all 0.5s",
            });
            renderToBody(data)
        },
        error: function (data, status) {
            console.log(data, status)
        }
    });
});

city_form_btn.click(() => {
    console.log(city_input.val())
    $.ajax({
        url: `https://api.openweathermap.org/data/2.5/forecast?q=${city_input.val()}&appid=${mykey}&units=metric`,
        method: "GET",
        cache: false,
        success: function (data) {
            $('.choice-section').css({
                opacity: "0",
                visibility: "hidden",
                zIndex: "-1",
                transition: "all 0.5s",
            });
            $('section>header').css({
                opacity: "1",
                visibility: "visible",
                zIndex: "1",
                transition: "all 0.5s",
            });
            console.log(data)
            renderToBody(data)
        },
        error: function (data, status) {
            console.log(data, status)
        }
    });
});



function renderToBody(data) {
    $('.date-time').html(`${newDate}`)
    $('.country').html(`${data.city.name},${data.city.country}`)
    $('.weather-img').html(`<img src=http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png >`)
    $('.weather-descrip').html(` ${data.list[0].weather[0].description}`)
    $('.wind').html(`${data.list[0].wind.speed} kmph `)
    $('.humi').html(`${data.list[0].main.humidity} mm `)
    $('.pre').html(`${data.list[0].main.pressure} mb `)
    $('.current-temp').html(`<h1>${data.list[0].main.temp}<b>'</b><b>C</b></h1>`) 
    console.log (data.list[0])
    $('.min-temp').html(`<h3>${Math.round(data.list[0].main.temp_min)}<b>'</b><b>C</b></h3>`)
    $('.max-temp').html(`<h3>${Math.round(data.list[0].main.temp_max)}<b>'</b><b>C</b></h3>`)
    $('.sec-row>ul>li:nth-child(1)').html(`<p class="dt-txt">${data.list[1].dt_txt}</p><img src=http://openweathermap.org/img/wn/${data.list[1].weather[0].icon}@2x.png> <div class="next-day-temp"><h3>${Math.round(data.list[1].main.temp_min)}<b>'</b><b>C</b></h3><h3>${Math.round(data.list[1].main.temp_max)}<b>'</b><b>C</b></h3></div> `)
    $('.sec-row>ul>li:nth-child(2)').html(`<p class="dt-txt">${data.list[2].dt_txt}</p><img src=http://openweathermap.org/img/wn/${data.list[2].weather[0].icon}@2x.png> <div class="next-day-temp"><h3>${Math.round(data.list[2].main.temp_min)}<b>'</b><b>C</b></h3><h3>${Math.round(data.list[2].main.temp_max)}<b>'</b><b>C</b></h3></div>`)
    $('.sec-row>ul>li:nth-child(3)').html(`<p class="dt-txt">${data.list[3].dt_txt}</p><img src=http://openweathermap.org/img/wn/${data.list[3].weather[0].icon}@2x.png> <div class="next-day-temp"><h3>${Math.round(data.list[3].main.temp_min)}<b>'</b><b>C</b></h3><h3>${Math.round(data.list[3].main.temp_max)}<b>'</b><b>C</b></h3></div>`)
    $('.sec-row>ul>li:nth-child(4)').html(`<p class="dt-txt">${data.list[4].dt_txt}</p><img src=http://openweathermap.org/img/wn/${data.list[4].weather[0].icon}@2x.png> <div class="next-day-temp"><h3>${Math.round(data.list[4].main.temp_min)}<b>'</b><b>C</b></h3><h3>${Math.round(data.list[4].main.temp_max)}<b>'</b><b>C</b></h3></div>`)
    $('.sec-row>ul>li:nth-child(5)').html(`<p class="dt-txt">${data.list[5].dt_txt}</p><img src=http://openweathermap.org/img/wn/${data.list[5].weather[0].icon}@2x.png> <div class="next-day-temp"><h3>${Math.round(data.list[5].main.temp_min)}<b>'</b><b>C</b></h3><h3>${Math.round(data.list[5].main.temp_max)}<b>'</b><b>C</b></h3></div>`)

    if (data.list[0].weather[0].icon == '01d' && data.list[0].weather[0].icon == '01n') {
        $('.clear-sky-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '02d' && data.list[0].weather[0].icon == '02n') {
        $('.clouds-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '03d' && data.list[0].weather[0].icon == '03n') {
        $('.clouds-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '04d' && data.list[0].weather[0].icon == '04n') {
        $('.clouds-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '09d' && data.list[0].weather[0].icon == '09n') {
        $('.rain-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '10d' && data.list[0].weather[0].icon == '10n') {
        $('.rain-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '11d' && data.list[0].weather[0].icon == '11n') {
        $('.rain-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '13d' && data.list[0].weather[0].icon == '13n') {
        $('.snow-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        })
        console.log(data.list[0].weather[0].icon)
    } else if (data.list[0].weather[0].icon == '50d' && data.list[0].weather[0].icon == '50n') {
        $('.clear-sky-gif').css({
            opacity: "1",
            visibility: "visible",
            transition: "all 0.5s",
        });
        console.log(data.list[0].weather[0].icon)
    }
}