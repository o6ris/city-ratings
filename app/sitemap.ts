import type { MetadataRoute } from "next";
import { getAllDistricts } from "./actions/actions";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const districts = await getAllDistricts();

  const dynamicPages = districts.flatMap((district) => {
    return [
      {
        url: `${baseUrl}/district/${district.id}`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/district/${district.id}/reviews`,
        lastModified: new Date(),
      },
    ];
  });

  return [
    {
      url: `${baseUrl}/home`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/rank`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
    },
    ...dynamicPages,
  ];
}
