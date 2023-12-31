import { Form, useLoaderData } from "react-router-dom";
import { dummySummary, getSummary } from "./loaders";
import { useEffect, useRef, useState } from "react";
import localforage from "localforage";
import { useDeviceWidth } from "./useDeviceWidth";
import { MobileSummaryFormComponent } from "./components/SummaryForm";

export async function loader({ request }) {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("search_query");
    if (!searchQuery) {
        return {};
    }
    // const summary = await getSummary(searchQuery);
    const summary = await dummySummary();
    return { summary };
}

export async function action({ request }) {
    const formData = await request.formData();
    const update = Object.fromEntries(formData);
    // update.search_query == the input with name: search_query
    const summary = await getSummary(update.search_query);
    return { summary }
}

const NoSearchResult = () => {
    return (
        <section className={"relative flex flex-column justify-center align-items-center pct:h-100 font-14 font-medium text-center"}>
            <span>No search results</span>
        </section>
    )
}

const SummaryItemLoading = () => {
    return (
        <section className={"search-result-pulse-container relative flex flex-column justify-end align-items-end pct:w-100 h-160 radius-sm shadow:0px-0px-8px-2px-E4E4E4 mg-t2 bg-inherit lg:mg-x-auto|h-240 dark:bg-121714 dark:shadow-unset dark:border:1px_solid_444444"}>
            <div className={"d-block pct:w-100 h-48 border:0px_solid_D4D4D4 em:border-t-0.04 dark:border:0px_solid_222222 dark:em:border-t-0.05"}></div>
        </section>
    )
}

const SummaryItem = ({ itemType, groupedResult, hostName }) => {
    console.log("Inside summary item")
    const SummaryItemCommon = () => {
        return (
            <>
                <div className={"relative pct:w-100 font-12 font-medium h-3 lh-3 pad-x2 color-rebeccapurple color-191E30 text-ellipsis hover:underline-offset-3 hover:underline hover:decoration-3 dark:color-gray dark:h-5|lh-5|color-lightgray"}>{groupedResult?.title}</div>
                <a href={groupedResult?.link} target="_blank" rel="noreferrer" data-href="/summary/url" className={"d-block decoration-none pct:w-100 cursor-pointer text-ellipsis pad-x2 pad-y1 border:0px_solid_D4D4D4 em:border-t-0.04 hover:bg-lighter lg:border-0 dark:border:0px_solid_222222 dark:em:border-t-0.05 dark:hover:bg-4444"}>
                    <div className={"relative flex flex-row align-items font-11 font-medium color-gray dark:font-regular dark:color-gray"}>
                        <img src="{pageThumbnailData?.src || groupedResult?.icon}" alt="" width="" className={"relative square-3 lh-3 radius-circle font-12 font-medium dark:font-semibold color-gray dark:color-lightgray bg-light dark:bg-lighter mg-r1 object-contain object-center"} />
                        {groupedResult?.displayLink || hostName}
                    </div>
                </a>
                <div className={"relative lh-3 font-12 font-medium pad-x2 pad-y2 break-word color-565656 dark:color-A4A4A4|pad-t-1|pad-b2"}>
                    {groupedResult?.summary_text ?? groupedResult?.summary ?? groupedResult?.text}
                </div>
            </>
        )
    }

    return (
        itemType === "group"
            ? <section className="relative flex-grow flex-noshrink flex flex-column justify-between align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-E4E4E4 mg-y2 bg-inherit lg:shadow:0px-0px-8px-1px-D8D8D8 dark:bg-121714 dark:shadow-unset dark:border:1px_solid_444444">
                {/* For grouped items */}
                <SummaryItemCommon />
            </section>
            : <section className={"relative flex flex-column justify-start align-items-start pct:w-100 radius-sm shadow:0px-0px-8px-1px-D8D8D8 mg-b4 bg-inherit lg:mg-x-auto|shadow:0px-0px-0px-1px-transparent dark:bg-121714 dark:shadow-unset dark:border:0px_solid_444444"}>
                {/* For single items */}
                <SummaryItemCommon />
            </section>
    )
}

const SummaryList = (props) => {
    const data = props.data;
    const isStreaming = props.isStreaming;
    const isError = props.isError;
    if (data.length < 1) {
        return (
            <section>No search results to display</section>
        )
    } else if (data?.length >= 1) {
        return (
            data?.map((eachSummary, index) => {
                const pageNumber = ((props.currentStartIndex - 1) / 10) + (index + 1)
                return (
                    <>
                        {
                            pageNumber > 1
                            && <div className={"relative d-block font-bold pad-x1 pad-t4"}>
                                Page {pageNumber}
                            </div>
                        }
                        {Object.keys(eachSummary).map((grouper, index) => {
                            let hostName = grouper;
                            const grouperData = eachSummary[grouper];
                            if (grouperData.length === 1) {
                                // For single summary response
                                return (
                                    <SummaryItem key={index} groupedResult={grouperData[0]} hostName={grouper} />
                                )
                            } else if (grouperData.length > 1) {
                                // For grouped summary response
                                return (
                                    <section key={index} className={"d-block pad-t4 pad-b2"}>
                                        <section class="relative d-block h-4 lh-4 pct:w-100 font-13 pad-x1 color-454545 dark:color-lightgray">
                                            Results from <span className={"font-semibold"}>{hostName}</span>
                                            <span class="abs right-2 square-4 lh-4 radius-circle text-center bg-lighter dark:bg-27CE6234">{grouperData.length}</span>
                                        </section>
                                        <section key={index} className={"relative flex flex-row flex-nowrap overflow-x-auto every:mg-x1|pct:w-90 lg:every:pct:w-56"}>
                                            {
                                                grouperData.map((groupedResult, index) => {
                                                    <SummaryItem key={index} itemType={"group"} groupedResult={groupedResult} hostName={grouper} />
                                                })
                                            }
                                        </section>
                                    </section>
                                )
                            }
                        })}
                    </>
                )
            })
        )
    }
    console.log("Finished processing summary list");
}

const Summary = () => {
    const { summary } = useLoaderData();
    const offlineSummary = localforage.getItem()
    const fetchMoreData = false;
    const [nextPageData, setNextPageData] = useState(summary?.nextPageData);
    const [moreSummary, setMoreSummary] = useState(null);
    const deviceWidth = useDeviceWidth();

    useEffect(() => { }, [summary?.data]);
    // useEffect(() => {
    //     const fetch_config = {
    //         method: 'GET',
    //         headers: {
    //             'Accept': 'application/json',
    //             // 'Origin': '*',
    //         },
    //         modes: 'cors',  // options: cors, no-cors, same-origin
    //         cache: 'default',   // options: default, no-store, reload, no-cache, force-cache, only-if-cached
    //     }
    //     // fetch(nextPageData.next, fetch_config)
    //     axios(nextPageData?.next, fetch_config)
    //         // .then((res) => res.json())
    //         .then((res) => res.data)
    //         .then((data) => {
    //             setMoreSummary(data?.results);
    //             if (data?.next) {
    //                 setNextPageData({ hasNextPage: true, next: data?.next });
    //             } else {
    //                 setNextPageData({ hasNextPage: false, next: data?.next })
    //             }
    //         });
    //     return () => { }
    // }, [fetchMoreData]);
    return (
        <>
            {
                deviceWidth.windowWidth < deviceWidth.deviceWidthEnum.laptop
                    ? <section className={"relative flex flex-column flex-basis flex-grow every:color-454545 dark:every:color-lightgray"}>
                        <section className={"overflow-y-auto pct:w-100 pct:h-100 pad-x1 pad-y2 bg-white color-E2E2E2 every:color-454545 lg:overflow-y-unset dark:bg-070C09"}>
                            App secured
                            {
                                summary?.data &&
                                <div>
                                    {summary?.data.searchInformation?.formattedTotalResults} results in {summary?.data.searchInformation?.formattedSearchTime}s
                                </div>
                            }
                            {summary?.data && <div>Powered by Google search</div>}
                            {
                                summary?.data
                                    ? <SummaryList {...summary?.data}>
                                        {moreSummary}
                                    </SummaryList>
                                    : <NoSearchResult />
                            }
                            {
                                summary?.nextPageData?.hasNextPage
                                    ? <button type={"button"} className={"d-block mg-x-auto h-5 lh-5 font-9 font-bold border-0 bg-green-inverse color-green-dark pad-x2 radius"}>Load more apps</button>
                                    : null
                            }
                            {
                                summary?.isStreaming
                                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                        return (
                                            <SummaryItemLoading />
                                        )
                                    })
                                    : null
                            }
                            Ok
                        </section>
                        {
                            deviceWidth?.windowWidth < deviceWidth?.deviceWidthEnum.laptop
                            && <MobileSummaryFormComponent />
                        }
                    </section>
                    : <section className={"flex flex-row justify-start align-items-start mg-x-auto lg:w-1440 bg-green-invers"}>
                        {/* 70% of the container width. i.e., 65% of 1280 == 832 */}
                        <section className={"bg-pin pad-x8 lg:pct:w-56"}>
                            <section className={"pad-y4 font-11 color-E2E2E2 every:color-454545"}>
                                {
                                    summary?.data &&
                                    <div>
                                        {summary?.data.searchInformation?.formattedTotalResults} results in {summary?.data.searchInformation?.formattedSearchTime} seconds
                                    </div>
                                }
                                {summary?.data && <div className={"font-10 color-gray lh-3"}>Powered by Google search</div>}
                            </section>
                            {
                                summary?.data
                                    ? <SummaryList {...summary?.data}>
                                        {moreSummary}
                                    </SummaryList>
                                    : <NoSearchResult />
                            }
                            {
                                summary?.isStreaming
                                    ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => {
                                        return (
                                            <SummaryItemLoading />
                                        )
                                    })
                                    : null
                            }
                        </section>
                        {/* 30% of the container width. i.e., 35% of 1280 == 448 */}
                        <section className={"border:0px_solid_lightgray lg:pct:w-30 h-400"}>
                            <div className={"bg-blue-inverse pct:w-88 pct:h-100 radius mg-y2 dark:bg-27CE8E1A"}></div>
                            <div className={"bg-blue-inverse pct:w-88 pct:h-64 radius mg-y2"}></div>
                        </section>
                    </section>
            }
        </>
    )
}

export default Summary;