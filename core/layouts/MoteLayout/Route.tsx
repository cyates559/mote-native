import useModuleRouter from "./useModuleRouter";

export default function Route() {
  const {Page, pageProps} = useModuleRouter();
  // if(typeof Page === "string") {
  //   return <Loading>
  //     <T>
  //       {Page}
  //     </T>
  //   </Loading>
  // }
  return <Page {...pageProps}/>
}