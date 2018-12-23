//v0.1.0
//上一次维护日期: 2018-12-23

import React from "react";

export default class extends React.Component {
	state = {
		Items: [],
		current: 1,
		intervalKey: null
	};

	componentDidMount() {
		const { children, defaultShow, autoScroll, scrollTime } = this.props;

		this.setState({
			Items: children || [],
			current: defaultShow
		});

		if (autoScroll) {
			this.scroll(scrollTime);
		}
	}

	componentWillUnmount() {
		window.clearInterval(this.state.intervalKey);
	}

	render() {
		const { Items, current } = this.state;

		const stylePosition = {
			marginLeft: "-" + (current - 1) + "00%",
			transitionDuration: ".6s",
			transitionTimingFunction: "cubic-bezier(.06,.88,.07,.99)"
		};

		const { showNextPreBtns, showSelectBtns } = this.props;

		//显示下一个上一个按钮
		const renderNextPreBtns = bool => {
			if (bool)
				return (
					<div>
						<div
							className="zBoard-btn zBoard-toprevious"
							onClick={this.previousItem}
						/>
						<div className="zBoard-btn zBoard-tonext" onClick={this.nextItem} />
					</div>
				);
			return null;
		};

		//显示底部按钮组
		const renderSelectBtns = (bool, Items) => {
			if (bool)
				return (
					<ul className="zBoard-itemLink" onClick={this.selectItem}>
						{React.Children.map(Items, (child, i) => {
							if (i + 1 === current) return <li key={i} className="active" />;
							return <li key={i} />;
						})}
					</ul>
				);
			return null;
		};

		return (
			<div className="zBoard-container">
				<div className="zBoard-body">
					<ul
						onMouseDown={this.startDrag}
						onMouseMove={this.dragging}
						onMouseUp={this.endDrag}
					>
						{React.Children.map(Items, (child, i) => {
							if (i < 1)
								return (
									<li key={i} style={stylePosition}>
										{React.cloneElement(child, {
											style: { width: "100%", height: "100%" }
										})}
									</li>
								);
							return (
								<li key={i}>
									{React.cloneElement(child, {
										style: { width: "100%", height: "100%" }
									})}
								</li>
							);
						})}
					</ul>
				</div>
				{renderNextPreBtns(showNextPreBtns)}
				{renderSelectBtns(showSelectBtns, Items)}
			</div>
		);
	}

	//自动滚动动作
	scroll = timeout => {
		setInterval(() => {
			this.nextItem();
		}, timeout);
	};

	//上一项
	previousItem = () => {
		const { current } = this.state;
		this.upToNum(current - 1);
	};

	//下一项
	nextItem = () => {
		const { current } = this.state;
		this.upToNum(current + 1);
	};

	//重置到第一项
	upToFirst = () => {
		this.setState({
			current: 1
		});
	};

	//到最后一项
	upToEnd = () => {
		const { Items } = this.state;
		this.setState({
			current: Items.length
		});
	};

	//跳转到第几项
	upToNum = num => {
		const { Items } = this.state;
		//如果到了第一项还点上一项，跳转到最后一项
		if (num < 1) {
			this.upToEnd();
		}

		//如果到了最后一项，重置到第一项
		else if (num > Items.length) this.upToFirst();
		//跳转到第几项
		else {
			this.setState({
				current: num
			});
		}
	};

	//选第几个
	selectItem = e => {
		const _target = e.target;
		const getChildNumero = function(node, callback) {
			let _parent = node.parentNode;

			for (let i = 0; i < _parent.children.length; i++) {
				if (_parent.children[i] === node) {
					callback(i + 1, node);
					break;
				}
			}
		};
		if (_target.tagName.toLowerCase() === "li") {
			//获取一个子节点是其父节点的第几个子节点
			getChildNumero(_target, num => {
				this.upToNum(num);
			});
		}
	};
}
