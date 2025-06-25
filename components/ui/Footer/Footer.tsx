import Link from "next/link"

export default function Footer() {
  return (
    <footer className=" absolute bottom-0 left-0 w-full">
      <div className="container mx-auto text-center mb-6">
        <p className="!text-xsmall">
          &copy; {new Date().getFullYear()} Neighbours Voices. All rights reserved.
        </p>
        <div className="text-xsmall">
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Use
          </Link>{" "}
          |{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );  
}