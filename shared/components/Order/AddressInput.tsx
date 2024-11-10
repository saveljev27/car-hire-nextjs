'use client';

import { useRef, useState } from 'react';
import { useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { Input } from '../UI/Input';

export const AddressInput = () => {
  const inputRef = useRef<google.maps.places.SearchBox | null>(null);
  const [address, setAddress] = useState<string>('');

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLEMAPS_API_KEY as string,
    libraries: ['places'],
  });

  const handleOnPlacesChanged = () => {
    const places = inputRef.current?.getPlaces();
    const address = places?.[0].formatted_address;
    if (address) {
      setAddress(address);
    }
  };

  return (
    <div>
      {isLoaded ? (
        <StandaloneSearchBox
          onLoad={(ref) => (inputRef.current = ref)}
          onPlacesChanged={handleOnPlacesChanged}
        >
          <Input
            id="address"
            name="address"
            label="Address"
            placeholder="123 Main St, New York, NY 10001"
            defaultValue={address}
          />
        </StandaloneSearchBox>
      ) : (
        <Input
          id="address"
          name="address"
          label="Address"
          placeholder="123 Main St, New York, NY 10001"
          defaultValue={address}
        />
      )}
    </div>
  );
};
