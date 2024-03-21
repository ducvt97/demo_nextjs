import Hero from "@/components/common/Hero";
import InfoBoxes from "@/components/common/InfoBoxes";
import ListCardProperty from "@/components/property/ListCardProperty";
import { Property } from "@/models/property";
import propertiesJSON from "@/properties.json";

const properties = propertiesJSON as Property[];

export default function Home() {
  return (
    <main>
      <Hero />
      <InfoBoxes />
      <ListCardProperty properties={properties} />
    </main>
  );
}
