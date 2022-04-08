import { useQuery, useMutation, useQueryClient } from "react-query";
import { http } from "@/utils";
import type { Vehicle, VehiclePayload } from "@/types";

export const useVehicles = () =>
  useQuery<Vehicle[], Response>("vehicles", () => http.get("/api/vehicles"));

export const useVehicle = (id: string) =>
  useQuery<Vehicle, Response>(["vehicle", id], () =>
    http.get(`/api/vehicles/${id}`)
  );

export const useCreateVehicle = () =>
  useMutation<Vehicle, Response, VehiclePayload>((body) =>
    http.post("/api/vehicles", { json: body })
  );

export const useDeleteVehicle = () => {
  const queryClient = useQueryClient();

  return useMutation<Vehicle, Response, string, Vehicle[]>(
    (id) => http.delete(`/api/vehicles/${id}`),
    {
      onMutate: async (id) => {
        await queryClient.cancelQueries("vehicles");
        // Remove the vehicles immediately
        const previous = queryClient.getQueryData<Vehicle[]>("vehicles");
        if (previous) {
          queryClient.setQueryData(
            "vehicles",
            previous.filter((vehicle) => vehicle.id !== id)
          );
        }
        return previous;
      },
      onError: (error, id, context) => {
        // Revert the original list of vehicles on error
        if (context) {
          queryClient.setQueryData(["vehicles"], context);
        }
      },
      onSettled: () => {
        // Fetch the list of new vehicles
        queryClient.invalidateQueries("vehicles");
      },
    }
  );
};
