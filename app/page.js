import CityList from "@/components/CityList";

export const metadata = {
  title: "SFE- Weather App",
  description: "Weather app created for an interview",
};
export default function Home() {
  // const
  return (
    <main className="cmin-h-screen cpy-29 cpx-30 ">
      <h2 className="home-text">Hello</h2>
      <h1 className="home-text">Discover the weather</h1>

      <div className="cmt-21">
        <CityList />
      </div>
    </main>
  );
}
