import { Component } from 'react';
import { DataOption } from './docs/data';
export default class Dropdown extends Component<{
    data?: DataOption[];
}> {
    constructor(props: any);
    state: {
        options: DataOption[];
    };
    static getDerivedStateFromProps(props: any, state: any): {
        options: any;
    };
    render(): JSX.Element;
}
