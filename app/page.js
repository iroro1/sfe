import CityList from "@/components/CityList";
import Search from "@/components/Search";

export const metadata = {
  title: "SFE- Weather App",
  description: "Weather app created for an interview",
};
export default function Home() {
  // const
  return (
    <main className="cmin-h-screen cpy-29 ">
      <div className="cpx-30 ">
        <h2 className="home-text">Hello</h2>
        <h1 className="home-text">Discover the weather</h1>
        <Search />
      </div>

      <div className="cmt-21 container">
        <CityList />
      </div>
    </main>
  );
}
