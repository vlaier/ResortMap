import "./App.css";
import { ResortMap } from "./components/ResortMap";
import { useResortLayout } from "./hooks/useResortLayout";

function App() {
  const { data, isLoading, error } = useResortLayout();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <div>
        <h1>Resort Layout</h1>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "fit-content",
            border: "1px solid red",
            backgroundColor: "lightblue",
            gap: "0px",
          }}
        >
          <ResortMap resortLayout={data} />
        </div>
      </div>
    </>
  );
}

export default App;
