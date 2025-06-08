import Blog from "./components/Blog";
import Booking from "./components/Booking";
import Hero from "./components/hero";
import Shop from "./components/shop";

export default function Home() {
  return (
    <div>
      <Hero />
      <Shop />
      <Blog />
      <Booking />
    </div>
  );
}
