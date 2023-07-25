import { Footer } from "./Footer"

export const Terms = () => {
    return (
        <section className={"summary-contact-content-container vh:h-100 font-14 overflow-y-auto"}>
            <section id="id-summary-terms-header" className={"summary-fragment-header font-16 font-bold h-8 lh-8 pad-x4"}>
                Terms and Conditions
            </section>
            <section id="id-summary-terms-body" className={"summary-fragment-body pad-x4"}>
                <header className={"font-14"}>
                    Terms of use
                </header>
            </section>
            <Footer />
        </section>
    )
}