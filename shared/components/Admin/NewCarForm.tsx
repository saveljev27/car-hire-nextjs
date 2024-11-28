import { CustomButton } from '@/shared/components/UI';
import { useCar } from '@/shared/hooks/useCar';
import { Status } from '@/shared/components/UI/Status';
import { CarContent } from './CarContent';

export const NewCarForm = () => {
  const { newCarState, handleNewCar } = useCar();

  return (
    <form action={handleNewCar}>
      <CarContent validation={newCarState} />
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
  );
};
