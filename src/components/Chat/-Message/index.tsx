import { ReactNode } from "react";
import { cn } from "@bem-react/classname";
import "./style.scss";
import { IMessageItem } from "../../../models/chat";
import { ReactSVG } from "react-svg";

import Reply from "./../icon/reply.svg";
import { getTimeFromData } from "../../../@adapters/Time/convertStringToHours";
import { useAppSelector } from "../../../hooks/redux";

const cnMessage = cn("chat-message");

const mineCnHelper = (is_mine: boolean) => ({ mine: is_mine, other: !is_mine });

type withArrowProps = {
    children?: ReactNode;
    is_mine: boolean;
};

const WithArrow = (props: withArrowProps) => (
    <>
        {!props.is_mine && <div className={cnMessage({ triangle: "other" })} />}
        {props.children}
        {props.is_mine && <div className={cnMessage({ triangle: "mine" })} />}
    </>
);

type Props = {
    is_first?: boolean;
    replay?: string;
} & IMessageItem;

export default function ChatMessage(props: Props) {
    const { firstname: name, lastname: surname } = useAppSelector(
        (state) => state.profile.user
    );

    return (
        <div className={cnMessage("wrapper", mineCnHelper(props.is_mine))}>
            <WithArrow is_mine={props.is_mine}>
                <div
                    className={cnMessage("actual", mineCnHelper(props.is_mine))}
                >
                    <div className={cnMessage("header")}>
                        <div
                            className={cnMessage("header", { sender: "info" })}
                        >
                            <span
                                className={cnMessage("header", {
                                    sender: "name",
                                })}
                            >
                                {props.is_mine
                                    ? `${name} ${surname}`
                                    : "Команда поддержки Speech Up"}
                            </span>
                            <span>{getTimeFromData(props.created_at)}</span>
                        </div>

                        {!props.is_mine && (
                            <div
                                className={cnMessage("header", {
                                    sender: "description",
                                })}
                            >
                                {props.from_user}
                            </div>
                        )}
                        {!props.is_mine && (
                            <div className={cnMessage("reply")}>
                                <ReactSVG
                                    src={Reply}
                                    className={cnMessage("reply-icon")}
                                />
                                <span className={cnMessage("reply-msg")}>
                                    {props.replay}
                                </span>
                            </div>
                        )}
                    </div>
                    <span>
                        {props.text}
                        {props.is_first && (
                            <>
                                👋🏼 Рады приветствовать вас в сервисе, который
                                призван помогать становиться успешнее и
                                увереннее в себе посредством развития навыков
                                публичных выступлений. <br />
                                <br />
                                📝 Основные инструкции по работе с сервисом вы
                                найдете{" "}
                                <a
                                    href="https://drive.google.com/file/d/1qMtB9VBr70v3aKN08RwBSm28jbKJbGEp/view"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    здесь
                                </a>
                                <br />
                                <br />
                                ❗️ Обращаем ваше внимание, что ввиду
                                особенностей работы системы Антиплагиат, с
                                которой взаимодействует Speech Up, в период
                                бета-тестирования отключена оценка показателя
                                &laquo;Аргументированность&raquo;, на всех видео
                                она будет равна 0%.
                                <br />
                                <br />
                                ✨ А в этот чат вы можете задавать любые вопросы
                                - и команде поддержки, и специалистам по
                                публичным выступлениям! Мы всегда на связи!
                                <br />
                                <br />
                                😉 Успешного тестирования! Ждём ваших отзывов.
                                <br />
                                <br />
                                ❤️ Спасибо, что помогаете нам становиться лучше!
                            </>
                        )}
                    </span>
                </div>
            </WithArrow>
        </div>
    );
}
