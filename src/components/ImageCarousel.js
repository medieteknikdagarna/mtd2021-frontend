import React, { Component } from 'react';

class ImageCarousel extends Component {
	constructor(props) {
		super(props);

		this.state = {
			intervalTime: props.intervalTime,
			fairpics: props.fairpics,
			styles: props.styles,
			picInterval: null,
			picTimeout: null,
			shownpic: 0,
			nextpic: 1,
			width1: 100,
			width2: 0,
		};

		this.updatePic = this.updatePic.bind(this);
	}

	updatePic() {
		let picTimeout = setTimeout(() => {
			let shownpic = this.state.shownpic + 1;
			if(shownpic === this.state.fairpics.length) {
				shownpic = 0;
			}

			let nextpic = shownpic + 1;
			if(nextpic === this.state.fairpics.length) {
				nextpic = 0;
			}

			this.setState({ shownpic, nextpic});
		}, 800);

		this.setState({ picTimeout });
	}

	componentDidMount() {
		const picInterval = setInterval(this.updatePic, this.state.intervalTime);
   	this.setState({picInterval: picInterval});
	}

	componentWillUnmount() {
		let picInterval = this.state.picInterval;
		let picTimeout = this.state.picTimeout;

		clearInterval(picInterval);
		clearInterval(picTimeout);

		this.setState({ picInterval, picTimeout });
	}

	render() {
		const pics = this.state.fairpics.map((item, index) => {
			const imageClass = index === this.state.shownpic ? this.state.styles.imageShown : this.state.styles.imageHidden;

			return (
				<figure className={`${this.state.styles.imageContainer} ${imageClass}`} key={index}>
					<div
						className={this.state.styles.image}
						style={{ backgroundImage: `url(${item})`}}
						alt="fairpicture"
					/>
				</figure>
			);
		});

    return (
			<div className={`${this.state.styles.bannerImg} ${this.state.toLeft ? this.state.styles.toLeft : ""}`}>
				{pics}
			</div>
		);
	}
}

export default ImageCarousel;
