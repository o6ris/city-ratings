import { createClient } from "@supabase/supabase-js";
import { districtsWithGeo } from "./districts_with_polygons.js";

async function updateDistricts() {
  const supabase = createClient(
    "https://vihmjmpkpxvqmdqfhxla.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZpaG1qbXBrcHh2cW1kcWZoeGxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY4MjMxNTAsImV4cCI6MjA2MjM5OTE1MH0.e-Lx5oSLyBxhl9GXQzoi4zNAk0J4pw2Bf6d616fxwHk"
  );
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  for (const district of districtsWithGeo) {
    const { name, lat, lon, geojson } = district;

    const { error } = await supabase
      .from("districts")
      .update({ lat, lon, geojson })
      .eq("name", name);

    if (error) {
      console.error(`Failed to update ${name}:`, error.message);
    } else {
      console.log(`Updated ${name}`);
    }

    await sleep(100); // Pause for 100ms between each request
  }
}

updateDistricts();
