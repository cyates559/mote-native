import useModuleRouter from "./useModuleRouter";

export default function Route() {
  const {Page} = useModuleRouter();
  // if(typeof Page === "string") {
  //   return <Loading>
  //     <T>
  //       {Page}
  //     </T>
  //   </Loading>
  // }
  return <Page/>
}