import { useEffect, useState } from "react";
import { IVideoFromBack, IVideoStatus } from "../../models/video";

import {
    useDeleteVideoByIdMutation,
    useGetVideoByUserQuery,
    useGetVideoStatusByUserQuery,
    useLazyGetVideoByUserSearchQuery,
} from "../../store/api/userVideo";

import StatsGraph from "../Graphs/Stats";
import ArchiveSearch from "../Archive/ArchiveSearch";

import Pagination from "../Pagination";
import RollUp from "../RollUp";
import AimBlock from "../AimBlock";
import Tabs, { TYPE_TABS } from "../Tabs";

import statisticIcon from "./icons/statistic.svg";
import videoListIcon from "./icons/videolist.svg";

import { cn } from "@bem-react/classname";

import BadGoodBlock, { TYPE_ACHIEVEMENTS } from "../BadGoodBlock";
import BlockGeneralAnalytics from "../BlockGeneralAnalytics";

import "./style.scss";
import percentHelper from "./helper";
import ArchiveVideoItem from "../Archive/ArchiveVideoItem";

import {
    useGetAchievementsQuery,
    useGetStatisticDataQuery,
} from "../../store/api/diary";
import { IAchievement, IStatisticItem, TYPE_DIARY } from "../../models/diary";

import lampСharge from "./icons/lampСharge.svg";
import RecommendationDairyGraph from "../RecommendationDairyGraph";
import VideoLoad from "../VideoLoad";
import { useLocation } from "react-router-dom";

export default function DiaryStart() {
    const sectionTitles = {
        total: "Общий результат",
        connectivity: "Связность",
        argumentativeness: "Аргументированность",
        clarity: "Ясность",
        dynamism: "Динамизм",
        persuasiveness: "Убедительность",
        communicative: "Коммуникативные нормы",
    };

    const cnDiaryStart = cn("DiaryStart");

    const [currentPage, setCurrentPage] = useState(0);
    const videosPerPage = 6;

    const { state } = useLocation();
    const { onAnalisys } = state ? state : false;

    const [waitAnalysisVideo, setWaitAnalysisVideo] = useState(
        onAnalisys ? onAnalisys : false
    );

    useEffect(() => {
        const interval = setInterval(() => {
            setWaitAnalysisVideo(false);
        }, 60000); //milisec
        return () => {
            clearInterval(interval);
        };
    }, []);

    /* ----------------------- ACHIEVEMENTS BLOCK -----------------------*/
    const achievementsJSON = useGetAchievementsQuery();
    const [achievementsData, setAchievementsData] = useState<IAchievement>();

    useEffect(() => {
        if (
            achievementsJSON &&
            achievementsJSON.isSuccess &&
            achievementsJSON.data &&
            achievementsJSON.data.data
        ) {
            // console.log(achievementsJSON.data!.data!);
            setAchievementsData(achievementsJSON.data!.data!);
        }
    }, [achievementsJSON]);

    /* ----------------------- STATS GRAPH BLOCK -----------------------*/
    const [statsData, setStatsData] = useState({
        total: [] as IStatisticItem[],
        connectivity: [] as IStatisticItem[],
        argumentativeness: [] as IStatisticItem[],
        clarity: [] as IStatisticItem[],
        dynamism: [] as IStatisticItem[],
        persuasiveness: [] as IStatisticItem[],
        communicative: [] as IStatisticItem[],
    });

    const totalJSON = useGetStatisticDataQuery(TYPE_DIARY.total);
    const connectivityJSON = useGetStatisticDataQuery(TYPE_DIARY.connectivity);
    const argumentativenessJSON = useGetStatisticDataQuery(
        TYPE_DIARY.argumentativeness
    );
    const clarityJSON = useGetStatisticDataQuery(TYPE_DIARY.clarity);
    const dynamismJSON = useGetStatisticDataQuery(TYPE_DIARY.dynamism);
    const persuasivenessJSON = useGetStatisticDataQuery(
        TYPE_DIARY.persuasiveness
    );
    const communicativeJSON = useGetStatisticDataQuery(
        TYPE_DIARY.communicative
    );

    useEffect(() => {
        if (totalJSON && totalJSON.isSuccess && totalJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                total: totalJSON.data.data!.values,
            }));
        }
    }, [totalJSON]);

    useEffect(() => {
        if (
            connectivityJSON &&
            connectivityJSON.isSuccess &&
            connectivityJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                connectivity: connectivityJSON.data.data!.values,
            }));
        }
    }, [connectivityJSON]);

    useEffect(() => {
        if (
            argumentativenessJSON &&
            argumentativenessJSON.isSuccess &&
            argumentativenessJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                argumentativeness: argumentativenessJSON.data.data!.values,
            }));
        }
    }, [argumentativenessJSON]);

    useEffect(() => {
        if (clarityJSON && clarityJSON.isSuccess && clarityJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                clarity: clarityJSON.data.data!.values,
            }));
        }
    }, [clarityJSON]);

    useEffect(() => {
        if (dynamismJSON && dynamismJSON.isSuccess && dynamismJSON.data.data) {
            setStatsData((prev) => ({
                ...prev,
                dynamism: dynamismJSON.data.data!.values,
            }));
        }
    }, [dynamismJSON]);

    useEffect(() => {
        if (
            persuasivenessJSON &&
            persuasivenessJSON.isSuccess &&
            persuasivenessJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                persuasiveness: persuasivenessJSON.data.data!.values,
            }));
        }
    }, [persuasivenessJSON]);

    useEffect(() => {
        if (
            communicativeJSON &&
            communicativeJSON.isSuccess &&
            communicativeJSON.data.data
        ) {
            setStatsData((prev) => ({
                ...prev,
                communicative: communicativeJSON.data.data!.values,
            }));
        }
    }, [communicativeJSON]);

    /* ----------------------------- VIDEO ON ANALYSIS ------------------------------*/

    const INTERVAL_PULLING = 10000; //milliseconds

    const [currentStatus, setCurrentStatus] = useState<IVideoStatus[]>([]);
    const [countAnalysisVideos, setCountAnalysisVideos] = useState<number>(0);

    const [currentPageAnalysis, setCurrentPageAnalysis] = useState(0);

    const [hasAnalysisVideo, setHasAnalysisVideo] = useState(false); // чтобы проверить, нужно ли нам обновить архивные видосы после выполнения анализа

    const analisisVideoByUser = useGetVideoStatusByUserQuery(
        {
            page: currentPageAnalysis,
            limit: videosPerPage,
        },
        {
            pollingInterval: INTERVAL_PULLING,
        }
    );

    useEffect(() => {
        if (analisisVideoByUser.data && analisisVideoByUser.data?.data) {
            setWaitAnalysisVideo(false);
            setCurrentStatus(analisisVideoByUser.data!.data!.videos);
            setCountAnalysisVideos(analisisVideoByUser.data!.data.total_videos);
            setHasAnalysisVideo(true);
        } else if (
            analisisVideoByUser.data &&
            analisisVideoByUser.data!.error!.msg === "Video not found"
        ) {
            setCurrentStatus([]);
            setCountAnalysisVideos(0);
        }
    }, [analisisVideoByUser]);

    /* ----------------------- RESEARCH VALUE -----------------------*/

    const [searchValue, setSearchValue] = useState<string>();

    const updateSearch = (value: string) => {
        setSearchValue(value);
    };

    /* ----------------------- RESEARCH VIDEO -----------------------*/

    const [searchVideos, setSearchVideos] = useState<IVideoFromBack[]>([]);
    const [countSearchVideos, setCountSearchVideos] = useState<number>(0);

    const [getVideosBySearch, videosBySearch] =
        useLazyGetVideoByUserSearchQuery();

    useEffect(() => {
        if (typeof searchValue === "string") {
            getVideosBySearch({
                page: currentPage,
                limit: videosPerPage,
                search: searchValue,
            });
        }
    }, [currentPage, getVideosBySearch, searchValue, hasAnalysisVideo]);

    useEffect(() => {
        if (
            videosBySearch &&
            videosBySearch.isSuccess &&
            videosBySearch.data &&
            videosBySearch.data!.data
        ) {
            setSearchVideos(videosBySearch.data!.data!.videos);
            setCountSearchVideos(videosBySearch.data!.data!.total_videos);
        }
    }, [videosBySearch]);

    useEffect(() => {
        if (hasAnalysisVideo) {
            getVideosBySearch({
                page: currentPage,
                limit: videosPerPage,
                search: searchValue,
            });
            if (countAnalysisVideos === 0) setHasAnalysisVideo(false);
        }
    }, [
        hasAnalysisVideo,
        countAnalysisVideos,
        getVideosBySearch,
        currentPage,
        searchValue,
    ]);

    /* ----------------------- GETTING VIDEO BLOCK -----------------------*/

    const videosDataFromBack = useGetVideoByUserQuery({
        page: currentPage,
        limit: videosPerPage,
    });

    useEffect(() => {
        if (
            videosDataFromBack &&
            videosDataFromBack.data &&
            videosDataFromBack.data!.data
        ) {
            setCountSearchVideos(videosDataFromBack.data!.data!.total_videos);
            setSearchVideos(videosDataFromBack.data!.data!.videos);
        }
    }, [videosDataFromBack]);

    /* ----------------------- ANALYSIS PAGINATION BLOCK -----------------------*/

    const paginateAnalysis = (pageNumber: number) => {
        setCurrentPageAnalysis(pageNumber);
    };

    const nextPageAnalysis = (maxPage: number) =>
        setCurrentPageAnalysis((prev) =>
            prev < maxPage - 1 ? prev + 1 : prev
        );

    const prevPageAnalysis = () =>
        setCurrentPageAnalysis((prev) => (prev > 0 ? prev - 1 : prev));

    /* ----------------------- COMMON PAGINATION BLOCK -----------------------*/

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const nextPage = (maxPage: number) =>
        setCurrentPage((prev) => (prev < maxPage - 1 ? prev + 1 : prev));

    const prevPage = () =>
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));

    /* ----------------------- ArchiveVideo Function -----------------------*/

    const [deleteRequest, deleteResponse] = useDeleteVideoByIdMutation();

    const deleteVideoByID = async (id: string) => await deleteRequest(id);

    const removeItem = async (id: string) => {
        deleteVideoByID(id);
    };

    useEffect(() => {
        if (deleteResponse.isSuccess) {
            if (countSearchVideos === 1) window.location.reload();
            const newvideo = async () =>
                await getVideosBySearch(
                    {
                        page: currentPage,
                        limit: videosPerPage,
                        search: searchValue,
                    },
                    false
                );
            newvideo();
        }
    }, [
        countSearchVideos,
        currentPage,
        deleteResponse,
        getVideosBySearch,
        searchValue,
    ]);

    function Change() {
        console.log("tyt");
    }

    return (
        <div>
            <div className={cnDiaryStart("text-h1", { margin_bottom: true })}>
                Достижения
            </div>
            <div className={cnDiaryStart("banner")}>
                {achievementsData && (
                    <BlockGeneralAnalytics
                        rank={achievementsData.rank}
                        previous_rank={achievementsData.previous_rank}
                        text={achievementsData.text}
                    />
                )}
            </div>

            <div className={cnDiaryStart("aims")}>
                <AimBlock />
            </div>

            <RollUp title="Видео на анализе" icon={videoListIcon}>
                {/* данные по видосикам на анализе которые */}
                {waitAnalysisVideo ? (
                    <div className={cnDiaryStart("text-empty-msg")}>
                        Ищем видео
                        <span
                            className={cnDiaryStart("text-empty-msg-animate")}
                        >
                            {" "}
                            . . .
                        </span>
                    </div>
                ) : (
                    <>
                        {countAnalysisVideos > 0 ? (
                            <>
                                {currentStatus.map((el, ind) => (
                                    <VideoLoad
                                        key={ind}
                                        el={el}
                                        ind={ind}
                                        percent={el.status_percent}
                                        isAllow={false}
                                    />
                                ))}
                                <Pagination
                                    videosPerPage={videosPerPage}
                                    totalVideos={countAnalysisVideos}
                                    paginate={paginateAnalysis}
                                    funcNextPage={nextPageAnalysis}
                                    funcPrevPage={prevPageAnalysis}
                                    currentPage={currentPageAnalysis + 1}
                                />
                            </>
                        ) : (
                            <div className={cnDiaryStart("text-empty-msg")}>
                                Нет видео на анализе
                            </div>
                        )}
                    </>
                )}
            </RollUp>

            <RollUp title="Статистика за неделю" icon={statisticIcon}>
                <div className={cnDiaryStart("row")}>
                    {achievementsData && (
                        <>
                            <BadGoodBlock
                                type={TYPE_ACHIEVEMENTS.improvements}
                                text={achievementsData.improvements}
                            />
                            <BadGoodBlock
                                type={TYPE_ACHIEVEMENTS.deterioration}
                                text={achievementsData.deterioration}
                            />
                        </>
                    )}
                </div>

                <Tabs type={TYPE_TABS.PERCENT}>
                    {statsData &&
                        sectionTitles &&
                        totalJSON &&
                        Object.entries(sectionTitles).map(
                            ([key, value], idx) => (
                                <div
                                    key={idx}
                                    data-title={value}
                                    data-value={`${percentHelper(
                                        totalJSON.data?.data,
                                        key
                                    )}%`}
                                    style={{ width: "100%" }}
                                >
                                    <StatsGraph
                                        data={[
                                            ...statsData[
                                                key as keyof typeof statsData
                                            ],
                                        ].reverse()}
                                    />
                                    <RecommendationDairyGraph
                                        icon={lampСharge}
                                    />
                                </div>
                            )
                        )}
                </Tabs>
            </RollUp>

            <div className={cnDiaryStart("textAndButton")}>
                <div className={cnDiaryStart("text-h1")}>
                    Архив проверок{" "}
                    {countSearchVideos && (
                        <span className={cnDiaryStart("text-gray")}>
                            {countSearchVideos}
                        </span>
                    )}
                </div>
                <div className={cnDiaryStart("btns")}>
                    <button className={cnDiaryStart("button")} onClick={Change}>
                        все
                    </button>
                    <button className={cnDiaryStart("button")}>
                        самые связные
                    </button>
                    <button className={cnDiaryStart("button")}>
                        самые убедительные
                    </button>
                    <button className={cnDiaryStart("button")}>
                        самые аргументированные
                    </button>
                    <button className={cnDiaryStart("button")}>
                        самые ясные
                    </button>
                    <button className={cnDiaryStart("button")}>
                        самые динамичные
                    </button>
                </div>
            </div>

            {countSearchVideos > 0 && searchVideos ? (
                <>
                    <ArchiveSearch updateSearch={updateSearch} />
                    {/* <ArchiveVideo video={searchVideos}/> */}
                    {searchVideos.map((el, ind) => (
                        <ArchiveVideoItem
                            handleClick={() => removeItem(el.id)}
                            key={el.id}
                            el={el}
                            ind={ind}
                            visible={el.status_video === "ERROR" ? false : true}
                        />
                    ))}
                    <Pagination
                        videosPerPage={videosPerPage}
                        totalVideos={countSearchVideos}
                        paginate={paginate}
                        funcNextPage={nextPage}
                        funcPrevPage={prevPage}
                        currentPage={currentPage + 1}
                    />
                </>
            ) : (
                <div className={cnDiaryStart("text-empty-msg")}>
                    Видео не найдено
                </div>
            )}
        </div>
    );
}
