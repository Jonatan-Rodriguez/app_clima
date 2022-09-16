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

  // funciones

  function peticiones(data){
    let temp = Math.round(data.main.temp);
    temperaturaValor.textContent = "";
    temperaturaValor.textContent += `${temp} °C`;
    
    let desc = data.weather[0].description;
    temperaturaDescripcion.textContent = "";
    temperaturaDescripcion.textContent += desc.toUpperCase();

    ubicacion.textContent = "";
    ubicacion.textContent += data.name;

    let max = Math.round(data.main.temp_max);
    tempMax.textContent = "";
    tempMax.textContent += `${max} °C`;

    let min = Math.round(data.main.temp_min);
    tempMin.textContent = "";
    tempMin.textContent += `${min} °C`;

    descViento.textContent = "";
    descViento.textContent += `Vel. viento: ${data.wind.speed} m/s`;

    descHumedad.textContent = "";
    descHumedad.textContent += `Humedad: ${data.main.humidity}%`;

    let sensacion = Math.round(data.main.feels_like);
    descSensacion.textContent = "";
    descSensacion.textContent += `Sensacion termica: ${sensacion} °C`;

    let presion = data.main.pressure
    descPresion.textContent = "";
    descPresion.textContent += `Presion admosferica: ${presion}`;
                
    //cambia de icono por estado del clima
    switch (data.weather[0].main) {
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
  }

  function loader(){
    let loader = document.getElementById(`loader`);
    let contenedor = document.getElementById(`contenedorMain`);
    let body = document.getElementById(`body`);

    body.style.background = `var(--colorPrimario)`
    contenedor.style.display = `grid`;
    loader.style.display = `none`;
  }

  //fucion de menu
  

  //funcion de busqueda por ciudad
  let entrada = document.getElementById(`entradaBuscador`)
  let buscador = document.getElementById(`botonBuscador`);

  buscador.addEventListener(`click`, () =>{
    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${entrada.value}&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;

    fetch(url2)
      .then( response => { return response.json() })
      .then(data => { 
        console.log(data);
        
        peticiones(data);

      });

  });

  //pido la ubicacion actual
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(posicion =>{

      //latitud y longitud de la ubicacion actual
      lat= posicion.coords.latitude;
      lon = posicion.coords.longitude;

      const url= `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;
      
      fetch(url)
      .then( response => { return response.json() })
      .then(datos => {

        peticiones(datos);
        
        loader();
      })

      .catch( error => {
        console.log(error)
      })
    })
  }
}) 