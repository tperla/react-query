import { useState } from "react";
import styles from "./AddCard.module.css"; // Importing styles for the component
import { Car } from "@/types/car"; // Importing the Car type for type checking

// Props type definition for the AddCarForm component
type AddCarFormProps = {
  onAdd: (car: Omit<Car, "_id">) => void; // Function to handle adding a new car
  onClose: () => void; // Function to handle closing the form
};

export default function AddCarForm({ onAdd, onClose }: AddCarFormProps) {
  // State to manage car details entered in the form
  const [carDetails, setCarDetails] = useState({ model_name: "", plate_number: "", color: "" });

  // Function to handle form submission
  const handleSubmit = () => {
    onAdd(carDetails); // Call the onAdd function with the car details
    onClose(); // Close the form
    setCarDetails({ model_name: "", plate_number: "", color: "" }); // Reset the form fields
  };

  return (
    <div className={styles.addCarForm}>
      <h2 className={styles.title}>Add New Car</h2>
      {/* Input for model name */}
      <input
        type="text"
        placeholder="Model Name"
        value={carDetails.model_name}
        onChange={(e) => setCarDetails({ ...carDetails, model_name: e.target.value })}
        className={styles.inputField}
      />
      {/* Input for plate number */}
      <input
        type="text"
        placeholder="Plate Number"
        value={carDetails.plate_number}
        onChange={(e) => setCarDetails({ ...carDetails, plate_number: e.target.value })}
        className={styles.inputField}
      />
      {/* Input for color */}
      <input
        type="text"
        placeholder="Color"
        value={carDetails.color}
        onChange={(e) => setCarDetails({ ...carDetails, color: e.target.value })}
        className={styles.inputField}
      />
      {/* Buttons for submitting or cancelling */}
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
