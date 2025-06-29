export default function useContact() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const postContact = async (payload: {
    name: string;
    email: string;
    message: string;
  }) => {
    console.log("payload", payload)
    const response = await fetch(`${baseUrl}/api/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("response", response)
    if (!response.ok) {
      throw new Error("Failed to send contact message");
    }
    const data = await response.json();
    console.log("response data", data)
    return data;
  };

  return { postContact };
}
