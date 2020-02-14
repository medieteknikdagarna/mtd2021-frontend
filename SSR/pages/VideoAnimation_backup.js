import React, { Component } from 'react';

var counter = 0;

class VideoAnimation extends Component {
	constructor(props) {
		super(props);

		this.state = {
			animationDone: false,
			styles: props.styles,
			frames: props.frames,
			animation: null,
			currentFrame: 0,
			id: props.id,
			frameRate: props.frameRate,
			loading: true,
			framesContent: null,
			amountLoadedImages: 0,
		};

		this.onloadCallback = this.onloadCallback.bind(this);
		this.doneLoading = this.doneLoading.bind(this);
		this.isAtBottomOfElement = this.isAtBottomOfElement.bind(this);
		this.startAnimation = this.startAnimation.bind(this);
		this.nextFrame = this.nextFrame.bind(this);
	}

	onloadCallback(index) {
		// Increment the counter
		counter++;

    // Verify if the counter is less than the number of images
    if(counter < this.state.frames.length){
      return;
    }

    // Trigger the final callback if is the last img
		this.doneLoading();
	}

	doneLoading() {
		this.setState({ loading: false });
		this.startAnimation();
	}

	isAtBottomOfElement(element) {
		return element.getBoundingClientRect().bottom <= window.innerHeight;
	}

	startAnimation() {
		let animation = setInterval(() => {
			this.nextFrame();
		}, this.state.frameRate);

		this.setState({ animation });
	}

	nextFrame() {
		const frameNumber = this.state.currentFrame;
		const nextFrameNumber = this.state.currentFrame + 1;

		if(nextFrameNumber < this.state.frames.length) {
			let currentFrame = document.getElementById(`${this.state.styles[this.state.id]}_frame_${frameNumber}`);
			let nextFrame = document.getElementById(`${this.state.styles[this.state.id]}_frame_${nextFrameNumber}`);
			currentFrame.classList.add(this.state.styles.before);
			nextFrame.classList.remove(this.state.styles.before);
			this.setState({ currentFrame: nextFrameNumber });
		}
		else {
			let animation = this.state.animation;
			clearInterval(animation);
			// this.setState({ animation });
		}
	}

	componentDidMount() {
		console.log("hej");
		this.state.frames.forEach((item, index) => {
			let img = new Image();
			img.src = item;
			img.onload = this.onloadCallback(index);
		});
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);

		let animation = this.state.animation;
		clearInterval(animation);
	}

	render() {
		let loadContent = null;
		if(this.state.loading) {
			loadContent = <div id={this.state.styles.loading}><div className={this.state.styles.image}/></div>;
		}

		//add frames, do not show any of them until animation starts
		let framesContent = this.state.frames.map((item, index) => {
			let id = `${this.state.styles[this.state.id]}_frame_${index}`;
			let beforeClass = this.state.styles.before;
			if(index === 0) {
				beforeClass = "";
			}

			return (
				<figure id={id} className={`${this.state.styles.frameContainer} ${beforeClass}`} key={index}>
						<div
							className={this.state.styles.frame}
							style={{ backgroundImage: `url(${item})` }}
							alt="frame"
						>
							{loadContent}
						</div>
				</figure>
			);
		});

    return (
			<div id={this.state.styles.mtdSphereVideo}>
				{framesContent}
			</div>
		);
	}
}

export default VideoAnimation;
