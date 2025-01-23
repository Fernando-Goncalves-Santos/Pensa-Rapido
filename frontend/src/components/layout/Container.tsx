import { ReactNode } from 'react'
import styles from './Container.module.css'

type Props = {
    children: ReactNode
}

const Container = (props: Props) => {
  return (
    <div className={styles.container}>
        {props.children}
    </div>
  )
}

export default Container