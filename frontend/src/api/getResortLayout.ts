export function getResortLayout() {
  return fetch("http://localhost:3000/resort").then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch resort layout");
    }
    return response.json();
  });
}
