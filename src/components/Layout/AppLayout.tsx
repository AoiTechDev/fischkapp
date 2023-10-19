import styles from './AppLayout.module.css'
interface Props {
  children: React.ReactNode;
}

export const AppLayout = (props: Props) => (
  <div className={styles.layout}>{props.children}</div>
);