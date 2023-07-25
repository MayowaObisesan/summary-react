import { Link } from "react-router-dom"
import { DesktopSummaryFormComponent } from "./components/SummaryForm"

export const DesktopNavBar = () => {
    return (
        <section id="id-summary-nav-header" className={"relative top-0 z-100 pct:w-100 shadow:0px-1px-1px-0px-lightgray lg:mg-x-auto dark:shadow:0px-0px-1px-0px-4444"}>
            <div className={"floats-container abs top-0 left-0 lg:square-11 lg:lh-11 square-8 lh-8 text-center z-101 transition:all_200ms_ease"}></div>
            <Link
                to="/about"
                id="id-float-help-container"
                className="abs top-0 right-0 lg:square-11 lg:lh-11 square-8 lh-8 text-center z-101 color-27CE8E transition:all_200ms_ease">
                <span className={"fa fa-question-circle font-18"}></span>
            </Link>
            <section className={"flex flex-row align-items-start"}>
                <Link
                    to="/"
                    className={"d-block font-semibold font-22 h-8 lh-8 lg:font-20 color-27CE8E text-left pad-l-108 lg:h-10 lg:lh-10 decoration-none hover:decoration-unset"}
                    tabIndex="-1">
                    Summary
                </Link>
                <div className={"lg:w-704 mg-x4 pad-t1"}>
                    <DesktopSummaryFormComponent />
                </div>
            </section>
        </section>
    )
}

export const MobileNavBar = () => {
    return (
        <section id="id-summary-nav-header" className={"relative top-0 z-100 pct:w-100 shadow:0px-1px-1px-0px-lightgray lg:mg-x-auto dark:shadow:0px-0px-1px-0px-444"}>
            <div className={"floats-container abs top-0 left-0 lg:square-11 lg:lh-11 square-8 lh-8 text-center z-101 transition:all_200ms_ease"}></div>
            <Link
                to="/about"
                id="id-float-help-container"
                className="abs top-0 right-0 lg:square-11 lg:lh-11 square-8 lh-8 text-center z-101 color-27CE8E transition:all_200ms_ease">
                <span className={"fa fa-question-circle font-18"}></span>
            </Link>
            <Link
                to="/"
                className={"d-block font-bold font-17 h-8 lh-8 lg:font-bold lg:font-22 color-27CE8E text-left pad-l2 decoration-none hover:decoration-unset lg:h-10|lh-10"}
                tabIndex="-1">
                Summary
            </Link>
        </section>
    )
}