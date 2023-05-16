import { cn } from "@bem-react/classname";
import {
    DetailedHTMLProps,
    ForwardRefRenderFunction,
    InputHTMLAttributes,
    LegacyRef,
    forwardRef,
    useState,
} from "react";

import HideIcon from "./assets/hide.svg";
import ShowIcon from "./assets/show.svg";

import "./style.scss";
import { ReactSVG } from "react-svg";

const cnInput = cn("new-input");

type InputProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

type Props = InputProps & {
    invalid?: boolean;
    customRef?: LegacyRef<HTMLInputElement>;
};

export default function Input(props: Props) {
    const isPassword = props.type === "password";
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cnInput()}>
            <input
                {...(props as InputProps)}
                ref={props.customRef}
                type={
                    isPassword
                        ? showPassword
                            ? "text"
                            : "password"
                        : props.type
                }
                className={cnInput("input", {
                    password: isPassword,
                    invalid: props.invalid,
                    numeric: props.type === "number"
                })}
            />
            {isPassword && (
                <ReactSVG
                    className={cnInput("eye")}
                    src={showPassword ? HideIcon : ShowIcon}
                    wrapper="span"
                    onClick={(e) => {
                        setShowPassword((prev) => !prev);
                    }}
                />
            )}
        </div>
    );
}

const ForwardedInputFunc: ForwardRefRenderFunction<HTMLInputElement, Props> = (
    props,
    ref
) => <Input customRef={ref} {...props} />;

export const ForwardedInput = forwardRef(ForwardedInputFunc);
