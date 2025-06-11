"use client";

import { useEffect, useState } from "react";
import { getDistricts } from "@/app/home/action";
import { debounce } from "lodash";

type District = { id: string; name: string };

export default function SearchDistrict() {
  const [searchTerm, setSearchTerm] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);

  const fetchDistricts = async (term: string) => {
    const result = await getDistricts(term);
    setDistricts(result);
  };

  // Debounced fetch
  const debouncedFetch = debounce(fetchDistricts, 400);

  useEffect(() => {
    debouncedFetch(searchTerm);

    return () => {
      debouncedFetch.cancel(); // Cleanup
    };
  }, [searchTerm]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Eg: Bridgeland"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      <ul className="space-y-2">
        {districts.length > 0 ? (
          districts.map((district) => (
            <li
              key={district.id}
              className="p-3 bg-white shadow rounded hover:bg-gray-100"
            >
              {district.name}
            </li>
          ))
        ) : (
          <li className="text-gray-500 italic">No districts found.</li>
        )}
      </ul>
    </div>
  );
}
