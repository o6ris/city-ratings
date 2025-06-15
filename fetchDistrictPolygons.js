import fetch from "node-fetch";
import fs from "fs/promises";

const districts = [
  "Abbeydale",
  "Acadia",
  "Albert Park/Radisson Heights",
  "Altadore",
  "Applewood Park",
  "Arbour Lake",
  "Aspen Woods",
  "Auburn Bay",
  "Banff Trail",
  "Bankview",
  "Bayview",
  "Beddington Heights",
  "Bel-Aire",
  "Beltline",
  "Bonavista Downs",
  "Bowness",
  "Braeside",
  "Bridlewood",
  "Britannia",
  "Cambrian Heights",
  "Canyon Meadows",
  "Capitol Hill",
  "Castleridge",
  "Cedarbrae",
  "CFB Currie",
  "CFB Lincoln Park PMQ",
  "Chaparral",
  "Charleswood",
  "Chinatown",
  "Chinook Park",
  "Christie Park",
  "Citadel",
  "Cityscape",
  "Cliff Bungalow",
  "Coach Hill",
  "Collingwood",
  "Copperfield",
  "Coral Springs",
  "Cougar Ridge",
  "Country Hills",
  "Country Hills Village",
  "Coventry Hills",
  "Cranston",
  "Crescent Heights",
  "Crestmont",
  "Dalhousie",
  "Deer Ridge",
  "Deer Run",
  "Diamond Cove",
  "Discovery Ridge",
  "Douglasdale/Glen",
  "Dover",
  "Downtown Commercial Core",
  "Downtown East Village",
  "Downtown West End",
  "Eagle Ridge",
  "Eau Claire",
  "Edgemont",
  "Elbow Park",
  "Elboya",
  "Erin Woods",
  "Erlton",
  "Evanston",
  "Evergreen",
  "Fairview",
  "Falconridge",
  "Forest Heights",
  "Forest Lawn",
  "Glamorgan",
  "Glenbrook",
  "Glendale",
  "Greenview",
  "Greenwood/Greenbriar",
  "Hamptons",
  "Harvest Hills",
  "Hawkwood",
  "Haysboro",
  "Hidden Valley",
  "Highland Park",
  "Highwood",
  "Hillhurst",
  "Hounsfield Heights/Briar Hill",
  "Huntington Hills",
  "Kelvin Grove",
  "Killarney/Glengarry",
  "Kincora",
  "Kingsland",
  "Lake Bonavista",
  "Lakeview",
  "Legacy",
  "Lincoln Park",
  "Lower Mount Royal",
  "MacEwan Glen",
  "Mahogany",
  "Manchester",
  "Maple Ridge",
  "Marlborough",
  "Marlborough Park",
  "Martindale",
  "Mayfair",
  "Mayland Heights",
  "McKenzie Lake",
  "McKenzie Towne",
  "Meadowlark Park",
  "Midnapore",
  "Millrise",
  "Mission",
  "Monterey Park",
  "Montgomery",
  "Mount Pleasant",
  "New Brighton",
  "Nolan Hill",
  "North Glenmore Park",
  "North Haven",
  "North Haven Upper",
  "Oakridge",
  "Ogden",
  "Palliser",
  "Panorama Hills",
  "Parkdale",
  "Parkhill",
  "Parkland",
  "Patterson",
  "Penbrooke Meadows",
  "Pineridge",
  "Point Mckay",
  "Pump Hill",
  "Queens Park Village",
  "Queensland",
  "Ramsay",
  "Ranchlands",
  "Red Carpet",
  "Redstone",
  "Renfrew",
  "Richmond",
  "Rideau Park",
  "Riverbend",
  "Rocky Ridge",
  "Rosedale",
  "Rosemont",
  "Rosscarrock",
  "Roxboro",
  "Royal Oak",
  "Rundle",
  "Rutland Park",
  "Saddle Ridge",
  "Sage Hill",
  "Sandstone Valley",
  "Scarboro",
  "Scarboro/Sunalta West",
  "Scenic Acres",
  "Seton",
  "Shaganappi",
  "Shawnee Slopes",
  "Shawnessy",
  "Shepard Industrial",
  "Sherwood",
  "Signal Hill",
  "Silver Springs",
  "Silverado",
  "Skyview Ranch",
  "Somerset",
  "South Calgary",
  "Southview",
  "Southwood",
  "Springbank Hill",
  "Spruce Cliff",
  "St. Andrews Heights",
  "Strathcona Park",
  "Sunalta",
  "Sundance",
  "Sunnyside",
  "Taradale",
  "Temple",
  "Thorncliffe",
  "Tuscany",
  "Tuxedo Park",
  "University District",
  "University Heights",
  "University of Calgary",
  "Upper Mount Royal",
  "Valley Ridge",
  "Varsity",
  "Vista Heights",
  "Walden",
  "West Hillhurst",
  "West Springs",
  "Westgate",
  "Whitehorn",
  "Wildwood",
  "Willow Park",
  "Windsor Park",
  "Winston Heights/Mountview",
  "Wolf Willow",
  "Woodbine",
  "Woodlands",
  "Yorkville",
  "Brentwood",
  "Bridgeland/Riverside",
  "Inglewood",
];
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

async function fetchDistrictData() {
  const results = [];

  for (const name of districts) {
    console.log(`🔎 Searching ${name}...`);

    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      name + ", Calgary"
    )}&format=json&limit=1`;

    const searchRes = await fetch(searchUrl, {
      headers: { "User-Agent": "CityRater/1.0 (loic.tsiry@gmail.com)" },
    });

    const searchData = await searchRes.json();

    if (!searchData[0]) {
      console.warn(`❌ No result for ${name}`);
      continue;
    }

    const { osm_id, lat, lon } = searchData[0];

    const detailsUrl = `https://nominatim.openstreetmap.org/details.php?osmtype=R&osmid=${osm_id}&format=json&polygon_geojson=1`;

    console.log(`🌐 Fetching polygon for ${name}...`);
    const detailsRes = await fetch(detailsUrl, {
      headers: { "User-Agent": "CityRater/1.0 (loic.tsiry@gmail.com)" },
    });

    const detailsData = await detailsRes.json();

    if (!detailsData?.geometry) {
      console.warn(`⚠️ No polygon for ${name}`);
      continue;
    }

    results.push({
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      geojson: detailsData.geometry,
    });

    await delay(1500); // 💡 Nominatim rate limit is 1 request/sec
  }

  await fs.writeFile(
    "districts_with_polygons.json",
    JSON.stringify(results, null, 2)
  );
  console.log("✅ Done! Saved to districts_with_polygons.json");
}

fetchDistrictData().catch(console.error);
