import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument, updateDocument } from "@/services/mongo";

// Fetches all documents from the "cars" collection
export async function GET() {
  const cars = await getAllDocuments("cars");
  return NextResponse.json(cars);
}

// Adds a new document to the "cars" collection
export async function POST(request: Request) {
  const newCar = await request.json();
  const result = await insertDocument("cars", newCar);
  return NextResponse.json({ message: "Car added", carId: result.insertedId });
}

// Updates an existing document in the "cars" collection
export async function PATCH(request: Request) {
  const body = await request.json();
  const update = { model_name: body.model_name, color: body.color, plate_number: body.plate_number };
  const result = await updateDocument('cars', body._id, update);
  return NextResponse.json(result);
}
