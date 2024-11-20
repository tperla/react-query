import React, { useState } from "react";
import styles from "./CarCard.module.css"; 
import { Car } from "@/types/car";

type CarCardProps = {
  car: Car;
  onDelete: (id: string) => void;
  onUpdate: (car: Car) => void;
};

export default function CarCard({ car, onDelete, onUpdate }: CarCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCar, setUpdatedCar] = useState({ ...car });

  const handleDelete = () => {
    onDelete(car._id);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdatedCar({ ...car }); // Reset form to the original values on toggle
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleSave = () => {
    onUpdate(updatedCar);
    setIsEditing(false);
  };

  return (
    <div className={styles.card}>
      {isEditing ? (
        <>
          <input
            type="text"
            name="model_name"
            value={updatedCar.model_name}
            onChange={handleChange}
            placeholder="Model Name"
            className={styles.editInput}
          />
          <input
            type="text"
            name="plate_number"
            value={updatedCar.plate_number}
            onChange={handleChange}
            placeholder="Plate Number"
            className={styles.editInput}
          />
          <input
            type="text"
            name="color"
            value={updatedCar.color}
            onChange={handleChange}
            placeholder="Color"
            className={styles.editInput}
          />
          <button onClick={handleSave} className={`${styles.button} ${styles.saveButton}`}>
            Save
          </button>
          <button onClick={handleEditToggle} className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <strong>Model:</strong> {car.model_name} <br />
          <strong>Plate Number:</strong> {car.plate_number} <br />
          <strong>Color:</strong> {car.color.replace("_", " ")} <br />
          <button onClick={handleEditToggle} className={`${styles.button} ${styles.editButton}`}>
            Edit
          </button>
          <button onClick={handleDelete} className={`${styles.button} ${styles.deleteButton}`}>
            Delete
          </button>
        </>
      )}
    </div>
  );
}
