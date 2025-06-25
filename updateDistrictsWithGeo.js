import { createClient } from "@supabase/supabase-js";
import { districtsWithGeo } from "./districts_with_polygons.js";

async function updateDistricts() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_UR,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
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
