'use client';

import { Container } from '@/shared/components';
import { PageHeader } from '@/shared/components/UI';
import {
  AdminBtn,
  BackBtn,
  CarListBtn,
} from '@/shared/components/Admin/NavButtons';
import { NewCarForm } from '@/shared/components/Admin/NewCarForm';

export default function NewCar() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center">
        <PageHeader>New Car</PageHeader>
        <div className="flex gap-3 justify-center mb-4">
          <BackBtn />
          <CarListBtn />
          <AdminBtn />
        </div>
        <NewCarForm />
      </div>
    </Container>
  );
}
