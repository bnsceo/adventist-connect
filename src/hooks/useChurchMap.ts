
import { useRef, useState, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { Church } from '@/types/social';

export const useChurchMap = (churches: Church[]) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const [mapKey, setMapKey] = useState("");

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = () => {
      if (!mapKey) {
        const token = prompt("Please enter your MapTiler API key for development:");
        if (token) {
          setMapKey(token);
        }
        return;
      }

      map.current = new maplibregl.Map({
        container: mapContainer.current,
        style: `https://api.maptiler.com/maps/streets/style.json?key=${mapKey}`,
        center: [-98.5795, 39.8283],
        zoom: 3
      });

      map.current.addControl(new maplibregl.NavigationControl(), 'top-right');

      churches.forEach((church) => {
        if (church.coordinates) {
          const markerElement = document.createElement('div');
          markerElement.className = 'church-marker';
          markerElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary"><path d="M18 6h.5A2.5 2.5 0 0 1 21 8.5v0A2.5 2.5 0 0 1 18.5 11h-13A2.5 2.5 0 0 1 3 8.5v0A2.5 2.5 0 0 1 5.5 6H6"/><path d="M18 6V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v2"/><path d="M10 11v4"/><path d="M14 11v4"/><path d="M12 11v4"/><path d="M6 11h12v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-8Z"/></svg>`;

          const marker = new maplibregl.Marker({element: markerElement})
            .setLngLat(church.coordinates)
            .setPopup(
              new maplibregl.Popup({ offset: 25 })
                .setHTML(
                  `<h3 class="font-semibold">${church.name}</h3>
                   <p class="text-sm">${church.location}</p>
                   <p class="text-sm mt-2">Services:<br/>
                   ${church.serviceTimes.map(service => 
                     `${service.type}: ${service.day} at ${service.time}`
                   ).join('<br/>')}</p>`
                )
            )
            .addTo(map.current);
        }
      });

      map.current.on('style.load', () => {
        if (map.current) {
          map.current.addSource('churches', {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: churches.map(church => ({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: church.coordinates || [0, 0]
                },
                properties: {
                  name: church.name,
                  location: church.location
                }
              }))
            }
          });
        }
      });
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapKey, churches]);

  const flyToChurch = (church: Church) => {
    if (map.current && church.coordinates) {
      map.current.flyTo({
        center: church.coordinates,
        zoom: 14,
        essential: true
      });
    }
  };

  return { mapContainer, flyToChurch };
};
