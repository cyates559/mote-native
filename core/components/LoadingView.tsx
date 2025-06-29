import DeadEnd, {DeadEndPropsType} from "@/core/components/DeadEnd";

export type LoadingViewPropsType = Omit<DeadEndPropsType, "loading">;

export default function LoadingView(props: LoadingViewPropsType) {
  return <DeadEnd loading {...props}/>
}
