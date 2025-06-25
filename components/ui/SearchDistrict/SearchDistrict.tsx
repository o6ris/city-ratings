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

  useEffect(() => {
    const modal = document.getElementById(modalId) as HTMLDialogElement | null;

    const handleClose = () => {
      setSearchTerm("");
      setDistricts([]);
    };

    // Add listener for modal close
    modal?.addEventListener("close", handleClose);

    return () => {
      modal?.removeEventListener("close", handleClose);
    };
  }, [modalId]);

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
        className="input input-xl border border-3 border-base-300 w-full rounded-2xl p-8"
      />

      <div className="flex flex-col bg-base-300 rounded-2xl mt-2 max-h-90 overflow-auto">
        {districts.map((district) => (
          <Link
            key={district.id}
            className="py-2 px-4 hover:bg-base-200"
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
