import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ColorList from "@/components/dashboard/product/variation/ColorList";
import SizeList from "@/components/dashboard/product/variation/SizeList";

interface IVariationProps {}

const Variation: FC<IVariationProps> = () => {
  return (
    <section>
      <Tabs defaultValue="color" className="my-2">
        <TabsList>
          <TabsTrigger value="color">Color</TabsTrigger>
          <TabsTrigger value="size">Size</TabsTrigger>
          <TabsTrigger value="version">Version</TabsTrigger>
        </TabsList>
        {/* COLOR VARIATION LIST */}
        <TabsContent value="color">
          <ColorList />
        </TabsContent>
        {/* SIZE VARIATION LIST */}
        <TabsContent value="size">
          <SizeList />
        </TabsContent>
        <TabsContent value="version">Developing mode</TabsContent>
      </Tabs>
    </section>
  );
};

export default Variation;
