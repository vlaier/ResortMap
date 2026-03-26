export function postBooking(
  cabanaId: string,
  bookingData: { guestName: string; room: number },
) {
  const body = bookingData;
  console.log("Posting booking with data:", { cabanaId, body });
  return fetch(`http://localhost:3000/book/${cabanaId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to post booking");
    }
    return response.json();
  });
}
