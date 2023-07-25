export const Footer = () => {
    const footerLinks = [
        { pathKey: "about", pathValue: "About" },
        { pathKey: "terms", pathValue: "Terms & Conditions" },
        { pathKey: "privacy", pathValue: "Privacy Policy" },
        { pathKey: "contact", pathValue: "Contact" }
    ];

    return (
        < section
            id="id-summary-sticky-footer"
            className={"sticky flex flex-row flex-wrap justify-center top-96 pct:w-100 h-8 lh-8 mg-x-auto text-center"}
        >
            <div className={"pct:w-100 flex-grow flex-noshrink flex flex-row justify-evenly every:font-13|decoration-none|color-initial hover:every:underline-2|underline-offset-2 dark:every:color-lightgray"}>
                {
                    footerLinks?.map(({ pathKey, pathValue }, index) => {
                        if (window.pathname !== `/${pathKey}`) {
                            <a key={index} aria-current="page" href="{pathKey}">{pathValue}</a>
                        }
                    })
                }
            </div >
        </section >
    )
}