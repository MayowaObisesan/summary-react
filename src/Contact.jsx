import { Footer } from "./Footer"

export const Contact = () => {
    return (
        <section className={"summary-contact-content-container vh:h-100 font-14 overflow-y-auto"}>
            <button id="id-summary-contact-close-button"
                className={"abs top-0 right-0 d-block square-7 lg:square-9 border-0 radius-circle bg-2341 hover:scale-0.8 transition:all_200ms_ease_80ms"}
                onclick="new SummaryView(this).closeContactView()">
                <span className={"fa fa-times d-inline-block v-align-middle square-4 lh-4 lg:square-6 lg:lh-6 bg-black color-white radius-circle font-semibold cursor-pointer font-16 lg:font-20"}></span>
            </button>
            <section id="id-summary-contact-header" className={"summary-contact-header font-16 font-bold h-6 lh-6 pad-x4"}>
                Contact ☎️
            </section>
            <section id="id-summary-contact-body" className={"summary-contact-body pad-x4"}>
                <ul>
                    <li>Email: <a href="mailto:summary.create@gmail.com" className={"h-5 lh-5 color-black font-bold dark:color-lightgray"}> Summary official email</a></li>
                    <li className={""}> Dial: <a href="tel:+2349137823897" className="h-5 lh-5 color-black font-bold dark:color-lightgray">(+234) 913 782 3897</a></li>
                </ul>
            </section >
            {/* <!-- < section id="id-summary-contact-sticky-footer"
                className={"sticky flex flex-row justify-center top-96 pct:w-100 h-8 lh-8 mg-x-auto text-center"} >
                <label for="id-summary-contact-close-button"
                    className={"border-0 outline-none bg-black color-white pad-x4 radius-round font-12 font-semibold cursor-pointer hover:pad-x12 hover:shadow:0px-8px-14px-1px-234|0px-0px-4px-4px-white|0px-0px-0px-8px-2342 transition:padding_400ms_ease|box-shadow_200ms_ease_400ms"}>
                    Close Contact page</label>
            </section > --> */}
            <Footer />
        </section >
    )
}