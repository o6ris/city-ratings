import SearchDistrict from "@/components/ui/SearchDistrict/SearchDistrict";
import Modal from "@/components/core/modal/Modal";

export default async function Home() {
  return (
    <section>
      <header className="flex flex-col gap-4 -mx-4 -mt-18 w-screen bg-[url(/Downtown_Calgary.jpg)] bg-cover bg-center text-white pt-32 pb-8 px-4 lg:-mx-[10rem] lg:-mt-[12rem] lg:px-[10rem] overflow-hidden">
        <div>
          <h1 className="leading-12 !text-xlarge text-shadow-lg lg:!text-xxlarge">
            Find your perfect place to live
          </h1>
          <h2 className="leading-12 !text-sm text-shadow-lg lg:!text-medium">
            Powered by real opinions from real residents
          </h2>
        </div>
        <Modal
          modalId="search-district"
          content={<SearchDistrict modalId="search-district" />}
          triggerBtnContent="Rate your community"
          triggerBtnStyle="btn bg-secondary rounded-full mr-auto shadow-none border-none text-primary font-bold"
        />
      </header>
    </section>
  );
}
