import { Footer } from "./Footer"

export const PrivacyPolicy = () => {
    return (
        <section className={"summary-contact-content-container vh:h-100 font-14 overflow-y-auto"}>
            <section id="id-summary-policy-header" className={"summary-fragment-header font-16 font-bold h-8 lh-8 pad-x4"}>
                Privacy Policy
            </section>
            <section id="id-summary-policy-body" className={"summary-fragment-body pad-x4"}>
                <header className={"font-14"}>
                    Summary's Privacy policy
                </header>
            </section>
            <Footer />
        </section>
    )
}