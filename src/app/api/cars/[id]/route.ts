import { NextResponse } from "next/server";
import { connectDatabase, updateDocument, deleteDocument } from "@/services/mongo";

// PUT: Update a car
export async function PUT(request: Request, context: any) {
    const updatedCar = await request.json();

    try {
        const result = await updateDocument("cars", context.params.id, updatedCar);
        if (result === false) {
            return NextResponse.json({ message: "No car was updated" }, { status: 404 });
        }
        return NextResponse.json({ message: "Car updated successfully" });
    } catch (error) {
        const e = error as Error; // Type assertion to Error
        console.error("Detailed error:", e.message); // Accessing error message
        return NextResponse.json({ message: "Error updating car", error: e.message }, { status: 500 });
    }
}


// DELETE: Remove a car
export async function DELETE(request: Request, context: any) {

    try {
        const result = await deleteDocument( "cars", context.params.id);
        if (result === false) {
            return NextResponse.json({ message: "No car found to delete" }, { status: 404 });
        }
        return NextResponse.json({ message: "Car deleted successfully" });
    } catch (error) {
        console.error("Error deleting car:", error);
        return NextResponse.json({ message: "Error deleting car" }, { status: 500 });
    } 
}
