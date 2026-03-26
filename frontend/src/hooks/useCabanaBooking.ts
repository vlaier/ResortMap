import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postBooking } from "../api/postBooking";
import type { ResortObject } from "../types/types";

export const useCabanaBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      cabanaId,
      bookingData,
    }: {
      cabanaId: string;
      bookingData: { guestName: string; room: number };
    }) => {
      console.log("Booking data:", { cabanaId, bookingData });
      return await postBooking(cabanaId, bookingData);
    },
    onMutate: async (newBooking) => {
      await queryClient.cancelQueries({ queryKey: ["resortLayout"] });
      const previousLayout = queryClient.getQueryData<ResortObject[][]>([
        "resortLayout",
      ]);
      queryClient.setQueryData(
        ["resortLayout"],
        (oldLayout: ResortObject[][]) => {
          oldLayout.map((row) => {
            row.map((item) => {
              if (item.type === "W" && item.id === newBooking.cabanaId) {
                item.isBooked = true;
                item.bookedBy = {
                  id: "temp-id",
                  guestName: newBooking.bookingData.guestName,
                  room: newBooking.bookingData.room,
                };
              }
            });
          });
          return oldLayout;
        },
      );
      return { previousLayout };
    },
    onError: (err, _, context) => {
      console.error("Booking failed:", err);
      queryClient.setQueryData(["resortLayout"], context?.previousLayout);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["resortLayout"] });
    },
  });
};
