import { Fragment } from "react"

import { Header } from "../../components/header/header"

export function HomePage() {
    return (
        <Fragment>
            <Header data={{
                label: 'Login',
                routerPath: 'login'
            }} />
            <section className="w-full relative mt-24">
                <div className="sm:w-full md:w-full md:flex md:flex-row sm:flex-col md:gap-5">
                    <h2 className="text-white">PÁGINA DA EMPRESA</h2>
                </div>
            </section>
        </Fragment>
    );
}
