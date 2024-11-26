'use server';

import { revalidatePath } from 'next/cache';
import { connectToDB } from '@/shared/lib';
import { User } from '@/shared/models/User';

export const getAllUsers = async () => {
  try {
    await connectToDB();
    const users = await User.find({}).sort({ createdAt: -1 });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error(error);
  }
};
export const findUser = async (id: string) => {
  try {
    await connectToDB();
    const user = await User.findOne({ _id: id });
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(error);
  }
};
export const updateUser = async (prevState: any, formData: FormData) => {
  const id = formData.get('_id');
  const email = formData.get('email');
  try {
    await connectToDB();
    const emailExistsId = await User.findOne({
      email: email,
      _id: { $ne: id },
    });
    if (emailExistsId) {
      return JSON.parse(
        JSON.stringify({ status: false, message: 'Email already exists' })
      );
    }
    const userInfo = Object.fromEntries(formData);
    const order = await User.findOneAndUpdate({ _id: id }, userInfo, {
      new: true,
    });
    await order.save();
    revalidatePath('/admin-panel/users');
    return JSON.parse(
      JSON.stringify({ status: true, message: 'User successfully updated' })
    );
  } catch (error) {
    return JSON.parse(
      JSON.stringify({ status: false, message: 'Error updating User' })
    );
  }
};
export const deleteUser = async (id: string) => {
  if (id) {
    await connectToDB();
    try {
      await User.findByIdAndDelete(id);
      revalidatePath('/admin-panel/users');
      return JSON.parse(JSON.stringify({ success: true }));
    } catch (error) {}
    return JSON.parse(JSON.stringify({ success: false }));
  }
};
