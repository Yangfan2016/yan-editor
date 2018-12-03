import * as React from 'react';
import { Icon, Tooltip, Button } from 'antd';
import { SvgFormatBrush, SvgRemoveFormat } from "./IconSvg";

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

export const TooltipButtonFormatBrush = (props: any) => {
    let { title, onClick } = props;
    return (
        <Tooltip placement="bottom" title={title}>
            <Button className="ant-btn-icon-only" onClick={onClick}>
                <Icon component={SvgFormatBrush} />
            </Button>
        </Tooltip>
    );
};

export const TooltipButtonRemoveFormat = (props: any) => {
    let { title, onClick } = props;
    return (
        <Tooltip placement="bottom" title={title}>
            <Button className="ant-btn-icon-only" onClick={onClick}>
                <Icon component={SvgRemoveFormat} />
            </Button>
        </Tooltip>
    );
};