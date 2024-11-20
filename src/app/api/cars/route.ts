import { NextResponse } from "next/server";
import { connectDatabase, getAllDocuments, insertDocument, updateDocument } from "@/services/mongo";

export async function GET() {
  const cars = await getAllDocuments("cars");
  return NextResponse.json(cars);
}

export async function POST(request: Request) {
  const newCar = await request.json();
  const result = await insertDocument("cars", newCar);
  return NextResponse.json({ message: "Car added", carId: result.insertedId });
}

export async function PATCH(request: Request) {
    const body = await request.json();
    const update = { model_name: body.model_name, color: body.color, plate_number: body.plate_number };
    const result = await updateDocument( 'cars', body._id, update);
    return NextResponse.json(result);
}

