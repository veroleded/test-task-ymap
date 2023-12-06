initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapListener,
    YMapControls,
    YMapGeolocationControlI,
    YMapZoomControlI,
  } = ymaps3;

  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [37.588144, 55.733842],

        // Уровень масштабирования
        zoom: 10,
      },
    },
  );

  const setting = { radius: 0, direction: 0 };

  const inputHandler = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      e.target.classList.add('danger');
      setting[e.target.id] = 0;
    } else {
      e.target.classList.remove('danger');
      setting[e.target.id] = value;
    }
  };
  const radiusInput = document.getElementById('radius');
  radiusInput.addEventListener('input', inputHandler);

  const directionInput = document.getElementById('direction');
  directionInput.addEventListener('input', inputHandler);

  const clickHandler = async (object, e) => {
    const coords = e.coordinates;
    const response = await axios.post('http://localhost:4000/getCars', {
      coords,
      radius: setting.radius,
      direction: setting.direction,
    })
    
  };

  // Добавляем слой для отображения схематической карты
  map.addChild(new YMapDefaultSchemeLayer());

  const mapListener = new YMapListener({
    layer: 'any',
    onClick: clickHandler,
  });

  map.addChild(mapListener);

  const controls = new YMapControls({ position: 'right' });
  const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
  const zoomControl = new YMapZoomControl();
  controls.addChild(zoomControl);
  map.addChild(controls);
}
