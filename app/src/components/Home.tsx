import { Title } from "@solidjs/meta";
import { record } from "rrweb";
import { createEffect, createSignal } from "solid-js";

export default function Home() {
  // const events = [] as any[];

  const [events, setEvents] = createSignal<any>([]);

  createEffect(() => {
    console.log("events", events());
  });

  return (
    <main>
      <Title>About</Title>
      <h1>About</h1>

      <input placeholder="Enter email here."></input>
      <button
        onClick={() => {
          record({
            emit(event) {
              // store the event in any way you like

              setEvents((prev) => [...prev, event]);
            },
          });
        }}
      >
        Record actions
      </button>
    </main>
  );
}
