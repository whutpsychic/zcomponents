import React from "react";
import "./style.css";
import Render from "./render";

export default class extends React.Component {
	render() {
		const { children } = this.props;
		const {
			defaultShow = 1,
			autoScroll = true,
			scrollTime = 5000,
			showNextPreBtns = true,
			showSelectBtns = true
		} = this.props;

		let obj = {
			defaultShow,
			autoScroll,
			scrollTime,
			showNextPreBtns,
			showSelectBtns
		};

		return <Render {...obj}>{children}</Render>;
	}
}
