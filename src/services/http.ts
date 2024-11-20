"use client";
import axios from 'axios';
import { Car } from "@/types/car";

export const fetchCars = async (): Promise<Car[]> => {
    const response = await axios.get<Car[]>('/api/cars');
    return JSON.parse(JSON.stringify(response.data));
};
  
export const updateCar = async (id: string, car: any): Promise<Car> => {
  const response = await axios.patch(`api/cars`, { ...car, _id: id });
  return (response.data);
};

export const deleteCar = async (carId: string): Promise<void> => {
    const response = await axios.delete(`/api/cars/${carId}`);
    return response.data;

};

export const addCar = async (car: any): Promise<Car> => {
    const response = await axios.post('/api/cars', car);
    return response.data;
};

