import { getTopDistricts } from "../home/action";

export default async function Rank() {
  const districts = await getTopDistricts();
  
  
}