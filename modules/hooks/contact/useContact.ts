export default function useContact() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const postContact = async (payload: {
    name: string;
    email: string;
    message: string;
  }) => {
    try {
      const response = await fetch(`${baseUrl}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessages = Object.entries(data.errors)
          .map(
            ([field, messages]) =>
              `${field}: ${(messages as string[]).join(", ")}`
          )
          .join("; ");

        throw new Error(`Validation failed: ${errorMessages}`);
      }
      return data;
    } catch (error) {
      // console.error("Error posting contact:", error);
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error("An unexpected error occurred");
      }
    }
  };

  return { postContact };
}
