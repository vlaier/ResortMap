import { ResortMap } from "./components/ResortMap";
import { useResortLayout } from "./hooks/useResortLayout";
import type { ResortObject } from "./types/types";

const pageShellClassName =
  "relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(255,230,187,0.4),_transparent_32%),linear-gradient(180deg,_#f7f1e4_0%,_#efe5d3_100%)] px-2 py-4 font-[Trebuchet_MS,_Gill_Sans,_sans-serif] text-[#40362d] sm:px-3 md:px-6 md:py-8";

const surfaceClassName =
  "relative overflow-hidden rounded-[28px] border border-[rgba(143,113,66,0.22)] bg-[radial-gradient(circle_at_top_right,_rgba(255,227,167,0.45),_transparent_28%),linear-gradient(145deg,_rgba(255,251,244,0.97),_rgba(245,239,227,0.9))] shadow-[0_24px_60px_rgba(56,40,18,0.12)]";

const eyebrowClassName =
  "mb-2 text-[0.76rem] font-bold uppercase tracking-[0.24em] text-[#8a6236]";

const heroCopyClassName = "max-w-[34rem] text-[1.02rem] text-[#5d5348]";

const statusPillClassName =
  "w-fit rounded-full bg-[rgba(31,24,17,0.88)] px-3 py-2 text-[0.82rem] text-[#fff8f0] sm:px-4 sm:py-2.5 sm:text-sm";

function App() {
  const { data, isLoading, error } = useResortLayout();

  if (isLoading) {
    return (
      <main className={pageShellClassName}>
        <div className="pointer-events-none absolute right-10 top-12 z-0 h-56 w-56 rounded-full bg-[rgba(115,205,215,0.18)] blur-xl" />
        <div className="pointer-events-none absolute bottom-20 left-8 z-0 h-72 w-72 rounded-full bg-[rgba(255,204,126,0.18)] blur-xl" />
        <div className="relative z-10 mx-auto grid max-w-300 gap-6">
          <section
            className={`${surfaceClassName} grid min-h-72 grid-cols-1 content-center gap-6 p-6 md:p-10`}
          >
            <p className={eyebrowClassName}>Resort board</p>
            <h1 className="max-w-[12ch] font-[Georgia,_Times_New_Roman,_serif] text-[clamp(2.8rem,6vw,4.9rem)] leading-[1.02] text-[#1f1811]">
              Preparing the live layout.
            </h1>
            <p className={heroCopyClassName}>
              Pulling the latest chalet, pool, and cabana state from the resort
              backend.
            </p>
            <div className={statusPillClassName}>
              Refreshing availability...
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={pageShellClassName}>
        <div className="pointer-events-none absolute right-10 top-12 z-0 h-56 w-56 rounded-full bg-[rgba(115,205,215,0.18)] blur-xl" />
        <div className="pointer-events-none absolute bottom-20 left-8 z-0 h-72 w-72 rounded-full bg-[rgba(255,204,126,0.18)] blur-xl" />
        <div className="relative z-10 mx-auto grid max-w-300 gap-6">
          <section
            className={`${surfaceClassName} grid min-h-72 grid-cols-1 content-center gap-6 p-6 md:p-10`}
          >
            <p className={eyebrowClassName}>Connection issue</p>
            <h1 className="max-w-[12ch] font-[Georgia,_Times_New_Roman,_serif] text-[clamp(2.8rem,6vw,4.9rem)] leading-[1.02] text-[#1f1811]">
              Unable to load the resort map.
            </h1>
            <p className={heroCopyClassName}>
              {error.message}. Check whether the backend is running on port 3000
              and try again.
            </p>
          </section>
        </div>
      </main>
    );
  }

  const resortLayout = data ?? [];
  const cabanas = resortLayout
    .flat()
    .filter(
      (
        tile: ResortObject | undefined,
      ): tile is Extract<ResortObject, { type: "W" }> => tile?.type === "W",
    );
  const bookedCount = cabanas.filter((cabana) => cabana.isBooked).length;
  const availableCount = cabanas.length - bookedCount;

  return (
    <main className={pageShellClassName}>
      <div className="pointer-events-none absolute right-10 top-12 -z-0 h-56 w-56 rounded-full bg-[rgba(115,205,215,0.18)] blur-xl" />
      <div className="pointer-events-none absolute bottom-20 left-8 -z-0 h-72 w-72 rounded-full bg-[rgba(255,204,126,0.18)] blur-xl" />

      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-6">
        <section
          className={`${surfaceClassName} grid items-end gap-4 p-4 sm:gap-6 sm:p-5 md:grid-cols-[minmax(0,1.7fr)_minmax(18rem,1fr)] md:p-10`}
        >
          <div className="max-w-[38rem]">
            <p className={eyebrowClassName}>Resort operations</p>
            <h1 className="mb-4 max-w-[12ch] font-[Georgia,_Times_New_Roman,_serif] text-[clamp(2.8rem,6vw,4.9rem)] leading-[1.02] text-[#1f1811]">
              Live booking board for the full property.
            </h1>
            <p className={heroCopyClassName}>
              Track premium cabanas, keep an eye on occupancy, and book open
              spots directly from the map.
            </p>
          </div>

          <div className="grid gap-4" aria-label="Resort summary">
            <article className="rounded-[20px] border border-[rgba(117,88,54,0.12)] bg-[rgba(255,255,255,0.76)] p-4 backdrop-blur-[18px]">
              <span className="mb-1 block text-[0.85rem] text-[#6d6258]">
                Total cabanas
              </span>
              <strong className="text-[clamp(2rem,4vw,3rem)] leading-none text-[#1f1811]">
                {cabanas.length}
              </strong>
            </article>
            <article className="rounded-[20px] border border-[rgba(117,88,54,0.12)] bg-[linear-gradient(135deg,_rgba(225,248,233,0.95),_rgba(203,239,223,0.88))] p-4 backdrop-blur-[18px]">
              <span className="mb-1 block text-[0.85rem] text-[#6d6258]">
                Available now
              </span>
              <strong className="text-[clamp(2rem,4vw,3rem)] leading-none text-[#1f1811]">
                {availableCount}
              </strong>
            </article>
            <article className="rounded-[20px] border border-[rgba(117,88,54,0.12)] bg-[linear-gradient(135deg,_rgba(255,231,226,0.95),_rgba(252,209,202,0.88))] p-4 backdrop-blur-[18px]">
              <span className="mb-1 block text-[0.85rem] text-[#6d6258]">
                Booked
              </span>
              <strong className="text-[clamp(2rem,4vw,3rem)] leading-none text-[#1f1811]">
                {bookedCount}
              </strong>
            </article>
          </div>
        </section>

        <section className={`${surfaceClassName} p-3 sm:p-4 md:p-6`}>
          <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className={eyebrowClassName}>Interactive layout</p>
              <h2 className="font-[Georgia,_Times_New_Roman,_serif] text-[clamp(1.4rem,3vw,2rem)] leading-[1.05] text-[#1f1811]">
                Tap any available cabana to place a booking.
              </h2>
            </div>
            <div className={statusPillClassName}>
              Auto refresh every 40 seconds
            </div>
          </div>

          <div className="rounded-3xl border border-[rgba(122,98,68,0.12)] bg-[linear-gradient(180deg,_rgba(244,236,220,0.8),_rgba(239,229,211,0.92)),repeating-linear-gradient(45deg,_rgba(155,125,81,0.05),_rgba(155,125,81,0.05)_10px,_rgba(255,255,255,0.08)_10px,_rgba(255,255,255,0.08)_20px)] p-2 sm:p-3 md:p-5">
            <ResortMap resortLayout={resortLayout} />
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
