import React from 'react';
import boardStyles from "../assets/styles/board.module.sass";
import commonStyle from "../assets/styles/common.module.sass";

const CopyIcon = ({fill,classname, ...props}) => {
    return (
        <svg className={classname} {...props}
            width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M11.5 0H3.5C3.36739 0 3.24021 0.0526785 3.14645 0.146447C3.05268 0.240215 3 0.367392 3 0.5V3H0.5C0.367392 3 0.240215 3.05268 0.146447 3.14645C0.0526785 3.24021 0 3.36739 0 3.5V11.5C0 11.6326 0.0526785 11.7598 0.146447 11.8536C0.240215 11.9473 0.367392 12 0.5 12H8.5C8.63261 12 8.75979 11.9473 8.85355 11.8536C8.94732 11.7598 9 11.6326 9 11.5V9H11.5C11.6326 9 11.7598 8.94732 11.8536 8.85355C11.9473 8.75979 12 8.63261 12 8.5V0.5C12 0.367392 11.9473 0.240215 11.8536 0.146447C11.7598 0.0526785 11.6326 0 11.5 0ZM8 11H1V4H8V11ZM11 8H9V3.5C9 3.36739 8.94732 3.24021 8.85355 3.14645C8.75979 3.05268 8.63261 3 8.5 3H4V1H11V8Z"
                fill={fill}/>
        </svg>
    );
};

export default CopyIcon;
