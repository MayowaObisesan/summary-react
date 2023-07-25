import { Outlet, ScrollRestoration } from "react-router-dom"
import { getSummaryTrends } from "./loaders"
import { DesktopNavBar, MobileNavBar } from "./NavBar";
import { useDeviceWidth } from "./useDeviceWidth";

export async function loader() {
    // const { trends } = await getSummaryTrends();
    // return { trends };
    return {};
}

export const Root = () => {
    const deviceWidth = useDeviceWidth();

    return (
        <div className={"relative flex flex-column vh:h-100 overflow-y-auto dark:bg-070C09"}>
            {
                deviceWidth?.windowWidth < deviceWidth?.deviceWidthEnum.laptop
                    ? <MobileNavBar />
                    : <DesktopNavBar />
            }
            <Outlet />
            <ScrollRestoration
                getKey={(location, matches) => {
                    return location.pathname;
                }}
            />
        </div>
    )
}