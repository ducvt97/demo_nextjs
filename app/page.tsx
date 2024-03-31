import Hero from "@/components/common/Hero";
import InfoBoxes from "@/components/common/InfoBoxes";
import ListCardProperty from "@/components/property/ListCardProperty";
import { getAll } from "@/services/property.service";

export default async function Home() {
  let { properties } = await getAll();
  properties = properties.slice(0, 3);

  return (
    <main>
      <Hero />
      <InfoBoxes />
      <ListCardProperty properties={properties} isSeeMore />
    </main>
  );
}
