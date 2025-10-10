import {ReactNode, useCallback, useMemo, useState} from "react";
import {StyleSheet, View, styled} from "@/core/components/View";
import LayerContext, {LayerControllerType} from "./LayerContext";


const LayerView = styled(View, {
  pointerEvents: "box-none",
  style: StyleSheet.absoluteFill,
  collapsable: false, // clip the elevations, otherwise they appear above sibling components

});

export default function LayerLayout({children}: {children?: ReactNode}) {
  const [layers, setLayers] = useState<ReactNode[]>([]);
  const mount = useCallback((children: ReactNode) => {
    const index = layers.length;
    setLayers(layers => [...layers, children]);
    return index;
  }, [setLayers]);
  const update = useCallback((index: number, children: ReactNode) => setLayers(layers => layers.map((prev, i) =>
    i === index? children: prev
  )), [setLayers]);
  const unmount = useCallback((index: number) => setLayers(layers =>
    layers.filter((_, i) => i !== index)
  ), [setLayers]);
  const controller: LayerControllerType = useMemo(() => ({mount, unmount, update}), [setLayers]);
  return (
    <LayerContext.Provider value={controller}>
      {children}
      {useMemo(() => (
        layers.map((layer, i) => <LayerView key={i} children={layer}/>)
      ), [layers])}
    </LayerContext.Provider>
  );
}
