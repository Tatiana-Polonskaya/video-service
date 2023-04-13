import { cn } from "@bem-react/classname";
import { ReactSVG } from "react-svg";
import SendIcon from "./icons/send.svg";

import "./style.scss";
import { useCallback, useEffect, useRef, useContext, useState } from "react";
import { ChatContext } from "..";

const cnFooter = cn("chat-footer");

export default function ChatFooter() {
    const [message, setMessage] = useState(String());
    const { addMessage } = useContext(ChatContext);

    const textAreaRef = useRef(null);

    const onKeyUp: React.KeyboardEventHandler<HTMLDivElement> = (event) => {
        const target = event.target as HTMLDivElement;
        if (!target.innerText.replace(/\n/g, "")) {
            target.innerText = "";
        }
        setMessage(target.innerText);
    };

    const newMessageHandler = () => {
        if (!message) return;
        addMessage({
            message,
            mine: true,
            senderName: "ME",
            time: "XX:YY",
        });
        setMessage("");
        if (textAreaRef.current) (textAreaRef.current as HTMLDivElement).innerText = "";
    };

    return (
        <div className={cnFooter()}>
            <div className={cnFooter("send-area")}>
                <div
                    contentEditable
                    onKeyUp={onKeyUp}
                    placeholder="Задай свой вопрос..."
                    className={cnFooter("textarea")}
                    suppressContentEditableWarning={true}
                    ref={textAreaRef}
                ></div>
            </div>
            <ReactSVG
                beforeInjection={(svg) => svg.addEventListener("click", newMessageHandler)}
                src={SendIcon}
                className={cnFooter("send-btn")}
            />
        </div>
    );
}