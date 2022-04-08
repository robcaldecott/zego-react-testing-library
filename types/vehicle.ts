export interface Vehicle {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  fuel: string;
  vin: string;
  color: string;
  mileage: number;
  registrationDate: string;
  registrationNumber: string;
}

// When we create a new vehicle no ID is required.
export interface VehiclePayload extends Omit<Vehicle, "id"> {}
