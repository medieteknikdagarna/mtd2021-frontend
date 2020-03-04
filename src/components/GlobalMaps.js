import React, { Component } from 'react';

import Map from './modifiedModules/pigeon-maps-modified/lib';
import Marker from 'pigeon-marker';
// import Overlay from 'pigeon-overlay';

import '../css/maps.scss';

import content from "../components/content/contact.json";

class GlobalMaps extends Component {
	constructor(props) {
		super(props);

		this.state = {
			lang: props.lang,
			link: props.link,
			zoom: props.zoom,
			center: props.center,//[50.874, 4.6947]
			width: props.width,
			height: props.height,
			mapWidth: null
		};

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize(e = null) {
		const width = Math.max(document.getElementById("wrapper").clientWidth * this.state.width, 200);
		this.setState({ mapWidth: width });
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);
		this.handleResize();
	}

	componentDidUpdate(prevProps) {
		if(prevProps.lang !== this.props.lang) {
			this.setState({
				lang: this.props.lang
			});
		}
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.handleResize);
	}

	render() {
		let marker = null;
		if(true) {
			marker = (
				<Marker anchor={this.state.center} payload={1} onClick={({ event, anchor, payload }) => {}} />
			);
		}

    return (
			<div className="map">
				<Map
					onWheel={this.handleScroll}
					center={this.state.center}
					width={this.state.mapWidth}
					height={this.state.height}
					zoom={this.state.zoom}
					twoFingerDrag={true}
					twoFingerDragWarning={content[this.state.lang]["0"].addresses.metaMove}
					metaWheelZoom={true}
					metaWheelZoomWarning={content[this.state.lang]["0"].addresses.metaScroll}
					provider={(x, y, z, dpr) => {
						const s = String.fromCharCode(97 + (x + y + z) % 3);
    				return `https://${s}.tile.openstreetmap.org/${z}/${x}/${y}.png`;
					}}
				>
					{marker}
				</Map>
				<div className="contentOverMap" style={{ top: -this.state.height-3 }}>
					{/*}<div className="zoomControllers">
						<div className="zoomControl">+</div>
						<div className="zoomControl">-</div>
					</div>{*/}
					<div className="link">
						<a href={this.state.link} target="blank">{content[this.state.lang]["0"].addresses.showInMaps}</a>
					</div>
				</div>
			</div>
		);
	}
}

export default GlobalMaps;
