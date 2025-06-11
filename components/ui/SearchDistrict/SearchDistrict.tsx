"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getDistricts } from "@/app/home/action";
import { debounce } from "lodash";

type District = { id: string; name: string };

export default function SearchDistrict({ modalId }: { modalId: string }) {
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

  const closeModal = () => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;
    modal?.close();
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <input
        type="text"
        placeholder="Eg: Bridgeland"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
      />

      <div className="space-y-2">
        {districts.map((district) => (
          <Link
            key={district.id}
            className="p-3"
            onClick={closeModal}
            href={`/district/${district.id}`}
          >
            {district.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
