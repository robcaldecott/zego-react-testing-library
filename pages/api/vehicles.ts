import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { vehicles } from "@/mocks";
import type { Vehicle } from "@/types";

interface Data {
  id: string;
  manufacturer: string;
  model: string;
  type: string;
  fuel: string;
  registrationNumber: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | Vehicle>
) {
  const { method } = req;

  switch (method) {
    case "GET":
      res.status(200).json(
        vehicles.map(
          ({ id, manufacturer, model, type, fuel, registrationNumber }) => ({
            id,
            manufacturer,
            model,
            type,
            fuel,
            registrationNumber,
          })
        )
      );
      break;
    case "POST":
      res.status(200).json({ id: uuidv4(), ...req.body });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
