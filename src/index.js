initMap();

async function initMap() {
  // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
  await ymaps3.ready;

  const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapListener,
    YMapControls,
    YMapMarker,
    YMapDefaultFeaturesLayer,
    YMapCollection,
    YMapLayer,
    YMapFeatureDataSource,
  } = ymaps3;

  const { YMapZoomControl } = await ymaps3.import('@yandex/ymaps3-controls@0.0.1');
  // Иницилиазируем карту
  const map = new YMap(
    // Передаём ссылку на HTMLElement контейнера
    document.getElementById('map'),

    // Передаём параметры инициализации карты
    {
      location: {
        // Координаты центра карты
        center: [53.803687, 56.461218],

        // Уровень масштабирования
        zoom: 14,
      },
    },
  );

  // Добавляем слой для отображения схематической карты
  map.addChild(new YMapDefaultSchemeLayer());
  map.addChild(new YMapDefaultFeaturesLayer());

  let radius = 1000;
  let collection = new YMapCollection();

  const inputHandler = (e) => {
    const value = Number(e.target.value);
    if (isNaN(value)) {
      e.target.classList.add('danger');
      radius = 1000;
    } else {
      e.target.classList.remove('danger');
      radius = value;
    }
  };

  const clickHandler = async (object, e) => {
    map.removeChild(collection);
    const coords = e.coordinates;
    const response = await axios.post('http://localhost:4000/getCars', {
      coords,
      radius,
    });
    collection = new YMapCollection();
    response.data.map((point) => {
      const markerElement = document.createElement('img');
      markerElement.className = 'marker';
      markerElement.src = './icons/car.png';
      markerElement.style.transform = `rotate(${Math.round(point.direction)}deg)`;
      const marker = new YMapMarker(
        {
          coordinates: point.coords,
          // draggable: true,
          // mapFollowsOnDrag: true,
        },
        markerElement,
      );
      // point.line.geometry.coordinates.map((coord) => {
      //   const markerElementLine = document.createElement('img');
      //   markerElementLine.className = 'point';
      //   // markerElementLine.src = './icons/car.png';
      //   // markerElementLine.style.transform = `rotate(${point.direction}deg)`
      //   const markerLine = new YMapMarker(
      //     {
      //       coordinates: [coord[1], coord[0]],
      //     },
      //     markerElementLine,
      //   );
      //   collection.addChild(markerLine);
      // });

      collection.addChild(marker);
    });
    map.addChild(collection);
  };

  const radiusInput = document.getElementById('radius');
  radiusInput.addEventListener('input', inputHandler);

  const controls = new YMapControls({ position: 'right' });
  const zoomControl = new YMapZoomControl();

  const mapListener = new YMapListener({
    layer: 'any',
    onClick: clickHandler,
  });

  map.addChild(mapListener);
  controls.addChild(zoomControl);
  map.addChild(controls);
}
