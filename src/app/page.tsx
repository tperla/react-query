"use client"
import { useState } from "react";
import CarCard from "@/components/CarCard/CarCard";
import AddCarForm from "@/components/AddCardForm/AddCardForm";
import Spinner from "@/components/Spinner/Spinner";
import { Car } from "@/types/car";
import { fetchCars, addCar, updateCar, deleteCar } from "@/services/http";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export default function Home() {
  const queryClient = useQueryClient();

  const { isLoading, isError, data, error } = useQuery<Car[]>({
    queryKey: ["cars"],
    queryFn: fetchCars,
    staleTime: 10000
  });

  const addMutation = useMutation({
    mutationFn: addCar,
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) }
  });

  const editMutation = useMutation({
    mutationFn: ({ id, car }: { id: string, car: any }) => updateCar(id, car),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
})

  const deleteMutation = useMutation({
    mutationFn: deleteCar,
    onMutate: async (id: string) => {
        setIsDeleting(true);
        await queryClient.cancelQueries({ queryKey: ['cars'] })
        const previousCars = queryClient.getQueryData(['cars'])
        queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car._id !== id))
        return { previousCars }
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
})

  const [showForm, setShowForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner />
      </div>
    );  }

  if (isError) {
    return <span>Error: {error?.message || "An unknown error occurred"}</span>;
  }

  return (
    <div className="main-container">
      {!showForm && (
        <button onClick={() => setShowForm(true)} className="add-button">
          Add Car
        </button>
      )}

      {showForm && (
        <AddCarForm
          onAdd={(car) => addMutation.mutate(car)}
          onClose={() => setShowForm(false)}
        />
      )}

      <div className="car-list">
      {data && data.map((car) => (
        <CarCard
          key={car._id}
          car={car}
          onDelete={() => deleteMutation.mutate(car._id)}
          onUpdate={(car: any) => editMutation.mutate({id: car._id, car})}
        />
        )) || <p>No cars available.</p>}
      </div>
    </div>
  );
}
