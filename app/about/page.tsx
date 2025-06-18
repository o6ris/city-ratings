import Icon from "@/components/core/Icons/Icon";
import Link from "next/link";

export default function AboutPage() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="">About Us</h1>
      <p>
        Finding the right community in a new city isn&apos;t always easy, and
        that&apos;s exactly where this idea started.
      </p>

      <p>
        When my family and I first moved to Calgary, we were full of hope but
        also full of questions: Where should we live? Which neighborhood would
        truly feel like home? What would the cost of living be like? Would we
        feel safe, welcomed, and supported?
      </p>

      <p>
        It took time, effort, and a little bit of luck, but eventually, we found
        a community that felt right for us. Most of the research was actually
        done by my wife (many thanks to her ❤️), and we had to do it all
        remotely, from our home country, before even setting foot in Calgary.
      </p>

      <p>
        Back then, the only real option was to scroll through Facebook groups
        and hope for honest, helpful posts. There wasn&apos;t a central place
        where we could compare neighborhoods based on real experiences and what
        actually matters to families and newcomers.
      </p>

      <p>That experience inspired me to create this platform.</p>

      <p>
        <strong>Neighbours Voices is completely free to use.</strong> This is a
        place where people can share their honest experiences about life in
        different Calgary communities, whether you&apos;re a newcomer trying to
        find your place, or a long-time Calgarian looking for change.
      </p>

      <p>
        Every voice matters here. Your reviews help others make informed
        decisions and build stronger, more connected communities across the
        city.
      </p>

      <p>
        Whether you&apos;re looking for better access to nature, affordable
        housing, or just a friendly vibe, I hope this platform makes your search
        easier, and maybe even helps you feel a little more at home.
      </p>

      <p>
        If you&apos;d like to contribute to the project in any way, feedback,
        partnerships, development, or spreading the word, feel free to reach
        out. I&apos;d love to hear from you.
      </p>

      {/* TODO : Setup a buy me a coffe thing */}
      {/* <p>
        And if you simply want to support the idea and buy me a coffee ☕ — I
        won&apos;t say no! It helps cover hosting and lets me keep working on
        improving the platform.
      </p>

      <div className="flex justify-center mt-4">
        <a
          href="https://www.buymeacoffee.com/YOUR-USERNAME"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-colors"
        >
          Buy Me a Coffee
        </a>
      </div> */}

      <div className="flex flex-col flex-start gap-4 mt-6">
        <p className="italic">Tsiry, Founder of Neighbours Voices</p>
        <Link
          className="inline-flex items-center border-2 p-2 w-fit"
          href={"https://www.linkedin.com/in/tsiry-ralambotsirofo/"}
          target="_blank"
        >
          <Icon name="Linkedin" size={14} />
        </Link>
      </div>
    </section>
  );
}
