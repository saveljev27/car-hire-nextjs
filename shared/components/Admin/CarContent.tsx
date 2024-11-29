import { useCar } from '@/shared/hooks/useCar';
import { CustomButton, Input, Select } from '../UI';
import { CarProps } from '@/types';

export interface CarContentProps {
  car?: CarProps;
  validation?: {
    status: boolean;
    message: string;
    errors?: {
      key: string;
      message: string;
    }[];
  };
}
export const CarContent = ({ car, validation }: CarContentProps) => {
  const {
    carFields,
    carSelectFields,
    carUrl,
    fileRef,
    uploading,
    handleChange,
    uploadFile,
  } = useCar(car);

  const imageValidation = validation?.errors?.find(
    (error) => error.key === 'image'
  );

  return (
    <div className="flex flex-col justify-center items-center gap-5 mb-8">
      <div
        className={`bg-gray-200 size-56 rounded-md overflow-hidden shadow-md border shadow-gray-400 flex justify-center items-center ${
          imageValidation ? 'border-red-500' : ''
        }`}
      >
        <img
          src={carUrl ? carUrl : car?.image || '/images/car-default.png'}
          alt="Car"
          className="object-contain max-w-full max-h-full p-2"
        />
      </div>
      {imageValidation && (
        <p className="text-red-500 text-sm">{imageValidation.message}</p>
      )}
      <div className="flex gap-3">
        <input
          type="file"
          onChange={handleChange}
          ref={fileRef}
          className="hidden"
        />
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
      <div>
        {car?._id && (
          <Input
            id="_id"
            name="_id"
            label="_id"
            defaultValue={car?._id}
            hidden
          />
        )}
        <Input
          id="image"
          name="image"
          defaultValue={carUrl ? carUrl : car?.image}
          hidden
        />
        <div className="grid grid-cols-3 gap-3">
          {Object.entries(carFields).map(([key, value]) => (
            <Input
              id={key}
              key={key}
              name={key}
              label={value.label}
              placeholder={value.placeholder}
              type={value.type}
              defaultValue={value.value}
              validation={validation?.errors}
            />
          ))}
        </div>
        {Object.entries(carSelectFields).map(([key, value]) => (
          <Select
            key={key}
            options={value.options}
            title={value.title}
            defaultValue={value.value}
            validation={validation?.errors}
          />
        ))}
      </div>
    </div>
  );
};
