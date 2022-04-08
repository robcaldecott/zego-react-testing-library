import type { NextApiRequest, NextApiResponse } from "next";
import { vehicles } from "@/mocks";
import type { Vehicle } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Vehicle | { message: string } | { id: string }>
) {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      // Lookup the vehicle
      const vehicle = vehicles.find((vehicle) => vehicle.id === id);
      if (vehicle) {
        res.status(200).json(vehicle);
      } else {
        res.status(500).json({ message: "Vehicle not found!" });
      }
      break;
    case "DELETE":
      res.status(200).json({ id: id as string });
      break;
    default:
      res.setHeader("Allow", ["GET", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
