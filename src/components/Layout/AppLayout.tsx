
interface Props {
  children: React.ReactNode;
}

export const AppLayout = (props: Props) => (
  <div >{props.children}</div>
);