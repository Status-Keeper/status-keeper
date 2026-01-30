import { Header } from "./Header/Header";

export function Brand({ small }: { small?: boolean }) {
  return (
    <div className={`brand ${small ? 'brand--small' : ''}`}>
      <Header />

    </div>
  )
}
