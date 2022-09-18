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
        iconoAnimado.src='./animated/thunder.svg';
      break;
      case 'Drizzle':
        iconoAnimado.src='./animated/rainy-2.svg';
      break;
      case 'Rain':
        iconoAnimado.src='./animated/rainy-7.svg';
      break;
      case 'Snow':
        iconoAnimado.src='./animated/snowy-6.svg';
      break;                        
      case 'Clear':
        iconoAnimado.src='./animated/day.svg';
      break;
      case 'Atmosphere':
        iconoAnimado.src='./animated/weather.svg';
      break;  
      case 'Clouds':
        iconoAnimado.src='./animated/cloudy-day-1.svg';
      break;  
      default:
        iconoAnimado.src='./animated/cloudy-day-3.svg';
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

  //funcion de boton atras

  let atras = document.getElementById(`atras`);

  atras.addEventListener(`click`, () =>{

    let ciudadAnterior = historialBusqueda[--contador];
    
    const url3 = `https://api.openweathermap.org/data/2.5/weather?q=${ciudadAnterior}&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;

    fetch(url3)
      .then( response => { return response.json() })
      .then(data3 => {
        
        peticiones(data3);

        if(contador < 1){
          atras.style.display = `none`;
        }

      });
  });

  // funcion de dark mode
  let switchDark = document.getElementById(`switch`);

  let dark = true;

   switchDark.addEventListener(`click`, () =>{

    if(dark == true){

      body.style.background = `var(--colorSecundario)`;
      dark = false;
      localStorage.setItem(`modeDark`, true);
      
    }else{
      body.style.background = `var(--colorPrimario)`;
      dark = true;
      localStorage.setItem(`modeDark`, false);
    }
   });


  //funcion de busqueda por ciudad
  let entrada = document.getElementById(`entradaBuscador`);
  let buscador = document.getElementById(`botonBuscador`);
  const historialBusqueda = [];
  let contador = 0;

  buscador.addEventListener(`click`, () =>{
    const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${entrada.value}&lang=es&units=metric&appid=86805e66e299b177d25fb974b3299abb`;

    fetch(url2)
      .then( response => { return response.json() })
      .then(data => { 
        
        peticiones(data);

        historialBusqueda.push(entrada.value);
        contador ++;
        
        atras.style.display = `flex`;
        
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

        historialBusqueda.push(datos.name);
        
        loader();
      })

      .catch( error => {
        console.log(error)
      })
    })
  }
}) 