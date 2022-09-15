window.addEventListener(`load`, ()=>{
  //capturo los elementos
  let lat;
  let lon;

  let temperaturaValor = document.getElementById(`temperaturaValor`);
  let temperaturaDescripcion = document.getElementById(`temperaturaDescripcion`);
  let ubicacion = document.getElementById(`ubicacion`);
  let iconoAnimado = document.getElementById(`iconoAnimado`);
  let tempMax = document.getElementById(`tempMax`);
  let tempMin = document.getElementById(`tempMin`);
  let descSensacion = document.getElementById(`descSensacion`);
  let descHumedad = document.getElementById(`descHumedad`);
  let descViento = document.getElementById(`descViento`);
  let descPresion = document.getElementById(`descPresion`);



  //pido la ubicacion actual
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicion =>{

      //latitud y longitud de la ubicacion actual
      lat= posicion.coords.latitude;
      lon = posicion.coords.longitude;

      const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;

      //(pendiente) llamada por nombre de ciudad
      /* const url2 = `https://api.openweathermap.org/data/2.5/weather?q=Madrid&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;
      console.log(url2) */
              
      fetch(url)
      .then( response => { return response.json() })
      .then(datos => {

        let temp = Math.round(datos.main.temp);
        temperaturaValor.textContent = `${temp} °C`
        
        let desc = datos.weather[0].description
        temperaturaDescripcion.textContent = desc.toUpperCase();

        ubicacion.textContent = datos.name;

        let max = Math.round(datos.main.temp_max);
        tempMax.textContent = `${max} °C`

        let min = Math.round(datos.main.temp_min);
        tempMin.textContent = `${min} °C`

        descViento.textContent = `Vel. viento: ${datos.wind.speed} m/s`;

        descHumedad.textContent = `Humedad: ${datos.main.humidity}%`

        let sensacion = Math.round(datos.main.feels_like)
        descSensacion.textContent = `Sensacion termica: ${sensacion} °C`

        let presion = datos.main.pressure
        descPresion.textContent = `Presion admosferica: ${presion}`
                    
        //cambia de icono por estado del clima
        switch (datos.weather[0].main) {
          case 'Thunderstorm':
            iconoAnimado.src='./animated/thunder.svg'
            console.log('TORMENTA');
          break;
          case 'Drizzle':
            iconoAnimado.src='./animated/rainy-2.svg'
            console.log('LLOVIZNA');
          break;
          case 'Rain':
            iconoAnimado.src='./animated/rainy-7.svg'
            console.log('LLUVIA');
          break;
          case 'Snow':
            iconoAnimado.src='./animated/snowy-6.svg'
            console.log('NIEVE');
          break;                        
          case 'Clear':
            iconoAnimado.src='./animated/day.svg'
            console.log('LIMPIO');
          break;
          case 'Atmosphere':
            iconoAnimado.src='./animated/weather.svg'
            console.log('ATMOSFERA');
          break;  
          case 'Clouds':
            iconoAnimado.src='./animated/cloudy-day-1.svg'
            console.log('NUBES');
          break;  
          default:
            iconoAnimado.src='./animated/cloudy-day-3.svg'
            console.log('por defecto');
          break;
        }
                    
      })
      .catch( error => {
        console.log(error)
      })
    })
  }
}) 