import * as React from 'react';
import { Tooltip, Button } from 'antd';
export const TooltipButton = (props: any) => {
    let { title, children, icon, onClick } = props;
    return (
        <Tooltip placement="bottom" title={title}>
            <Button icon={icon} onClick={onClick}>{children}</Button>
        </Tooltip>
    );
};

export const TooltipLabel = (props: any) => {
    let { title, children } = props;
    return (
        <Tooltip placement="bottom" title={title}>
            {children}
        </Tooltip>
    );
};