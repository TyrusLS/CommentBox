import React from "react";
import "../style/style.css";
import { DataOption } from "./docs/data";
export declare const initialDataOptions: DataOption[];
export declare class AllComponents extends React.Component<{}> {
    private static updateCallback;
    private static updateContext;
    private static updateUrl;
    constructor(props: any);
    static update(data: any[], context: string, url: string): void;
    state: {
        data: DataOption[];
        date: string;
        context: string;
        comment: string;
        loading: boolean;
        url: string;
    };
    componentWillMount(): void;
    componentWillUnmount(): void;
    loadData(): void;
    handleChange(e: any): void;
    render(): JSX.Element;
}
