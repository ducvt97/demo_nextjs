import Hero from "@/components/common/Hero";
import InfoBoxes from "@/components/common/InfoBoxes";
import ListCardProperty from "@/components/property/ListCardProperty";
import { IProperty } from "@/models/property";
import propertiesJSON from "@/properties.json";
import { getAll } from "@/services/property.service";

// const properties = propertiesJSON as IProperty[];

export default async function Home() {
  const properties = await getAll();
  return (
    <main>
      <Hero />
      <InfoBoxes />
      <ListCardProperty properties={properties} />
    </main>
  );
}
