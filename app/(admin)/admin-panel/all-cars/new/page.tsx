'use client';

import { useFormState } from 'react-dom';
import { Container } from '@/shared/components';
import {
  CustomButton,
  Input,
  PageHeader,
  Select,
} from '@/shared/components/UI';
import { transmissions, bodyClass, fuels, drive } from '@/shared/constants';
import {
  AdminBtn,
  BackBtn,
  CarListBtn,
} from '@/shared/components/Admin/NavButtons';

import { useCar } from '@/shared/hooks/useCar';
import { Status } from '@/shared/components/UI/Status';
import { createCar } from '@/app/actions/car';
import { useRef, useState } from 'react';

export default function NewCar() {
  const carId = crypto.randomUUID();
  const { carNewFields } = useCar();
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File>();
  const [carUrl, setCarUrl] = useState('');
  const [uploading, setUploading] = useState(false);

  const [newCarState, handleNewCar] = useFormState(createCar, null);

  const uploadFile = async () => {
    try {
      if (!file) {
        alert('No file selected');
        return;
      }

      setUploading(true);
      const data = new FormData();
      data.set('file', file);
      console.log(data);
      const uploadRequest = await fetch('/api/files', {
        method: 'POST',
        body: data,
      });
      const signedUrl = await uploadRequest.json();
      setCarUrl(signedUrl);
      setUploading(false);
    } catch (e) {
      console.log(e);
      setUploading(false);
      alert('Trouble uploading file');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target?.files?.[0]);
  };

  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>New Car</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <BackBtn />
          <CarListBtn />
          <AdminBtn />
        </div>
        <form action={handleNewCar}>
          <div className="flex flex-col justify-center items-center gap-5 mb-8">
            <div className="bg-gray-400 size-56 rounded-md overflow-hidden shadow-md shadow-gray-400 flex justify-center items-center">
              {carUrl && (
                <img
                  src={carUrl}
                  alt="Car"
                  className="object-contain max-w-full max-h-full"
                />
              )}
            </div>
            <input
              type="file"
              onChange={handleChange}
              ref={fileRef}
              className="hidden"
            />
            <div className="flex gap-3">
              <CustomButton
                title="Choose File"
                handleClick={() => fileRef?.current?.click()}
                containerStyles="interface_btn"
              />
              <button
                type="button"
                disabled={uploading}
                onClick={uploadFile}
                className="custom-btn interface_btn"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          <Input id="_id" name="_id" label="_id" defaultValue={carId} hidden />
          <Input id="image" name="image" defaultValue={carUrl} hidden />
          <div className="grid grid-cols-3 gap-3">
            {Object.entries(carNewFields).map(([key, value]) => (
              <Input
                id={key}
                key={key}
                name={key}
                label={key}
                placeholder={key}
                type={value.type}
              />
            ))}
          </div>

          <Select options={fuels} title="fuel_type" />
          <Select options={drive} title="drive" />
          <Select options={bodyClass} title="class" />
          <Select options={transmissions} title="transmission" />
          <Status status={newCarState} />
          <div className="mt-4 flex justify-end">
            <CustomButton
              title="Add"
              btnType="submit"
              containerStyles="bg-green-500"
              textStyles="text-white"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
