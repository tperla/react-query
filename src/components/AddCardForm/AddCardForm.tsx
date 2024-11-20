import { useState } from "react";
import styles from "./AddCard.module.css"; 
import { Car } from "@/types/car";

type AddCarFormProps = {
  onAdd: (car: Omit<Car, "_id">) => void;
  onClose: () => void;
};

export default function AddCarForm({ onAdd, onClose }: AddCarFormProps) {
  const [carDetails, setCarDetails] = useState({ model_name: "", plate_number: "", color: "" });

  const handleSubmit = () => {
    onAdd(carDetails);
    onClose();
    setCarDetails({ model_name: "", plate_number: "", color: "" });
  };

  return (
    <div className={styles.addCarForm}>
      <h2 className={styles.title}>Add New Car</h2>
      <input
        type="text"
        placeholder="Model Name"
        value={carDetails.model_name}
        onChange={(e) => setCarDetails({ ...carDetails, model_name: e.target.value })}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Plate Number"
        value={carDetails.plate_number}
        onChange={(e) => setCarDetails({ ...carDetails, plate_number: e.target.value })}
        className={styles.inputField}
      />
      <input
        type="text"
        placeholder="Color"
        value={carDetails.color}
        onChange={(e) => setCarDetails({ ...carDetails, color: e.target.value })}
        className={styles.inputField}
      />
      <div className={styles.buttonContainer}>
        <button onClick={handleSubmit} className={styles.addButton}>
          Add Car
        </button>
        <button onClick={onClose} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  );
}
