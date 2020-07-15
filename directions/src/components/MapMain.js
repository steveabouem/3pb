import React, { useState, useEffect, useContext } from 'react';
import { GoogleMap, LoadScript, DrawingManager, Polyline, Marker, DirectionsRenderer, DirectionsService } from '@react-google-maps/api';
import { Loader } from '../common/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MapSidebar } from './MapSidebar';
import { MapsContext, UserContext } from '../helpers/contexts';
import { createMap, getMaps, deleteMap } from '../helpers/api';
import { Modal } from '../common/Modals';
import { config, mapOptions } from '../helpers/variables';
import { CustomInfoWindow } from './CustomInfoWindow';
import { Nav } from './Nav';

export const MapMain = () => {
	const {user} = useContext(UserContext);
	const [loading, setLoading] = useState(true);
	//ADIDJAN
	const [mapData, setMapData] = useState({ email: user && user.email ? user.email : 's@t.com', center: { lat: 5.30966, lng: -4.01266 }, zoom: 14, drawingMode: null, darkMode: false, markers: [], destination: null });
	const [placesData, setPlacesData] = useState({});
	const [userMaps, setUserMaps] = useState([]);
	const [modal, setModal] = useState({ opened: false, type: '' });
	const [customInfo, setCustomInfo] = useState(null);

	const validations = Yup.object().shape({
		step1: Yup.string().required().min(4)
	});

	const initialValues = {
		mapTitle: '',
		step1: ''
	};

	useEffect(() => {
		async function updateMapList() {
			const maps = await getMaps();
			setUserMaps(maps?.data?.data);
		}
		updateMapList();
	}, [loading]);

	const searchOrigin = () => {
		let result = placesData?.getPlace().geometry.location;
		setMapData({ ...mapData, zoom: 18, center: { lat: result.lat(), lng: result.lng() } });
		setCustomInfo({ ...customInfo, info: true });
	};

	const searchDestination = d => {
		let result = d?.getPlace().geometry.location;
		setMapData({ ...mapData, zoom: 18, center: { lat: result.lat(), lng: result.lng() } });
		setCustomInfo({ ...customInfo, info: true });
	};

	const addMarker = m => {
		let markers = mapData.markers;
		markers.push(m.position);
		setMapData({ ...mapData, markers, zoom: 15 });
	};

	const savePath = polyline => {
		setMapData({ ...mapData, polylinePath: polyline.getPath().i })
	};

	const shareLink = () => {
	};

	const saveMap = () => {
		setLoading(true);

		createMap(mapData)
			.then(res => {
				setLoading(false);
				setModal({ opened: true, type: 'success' });
			})
			.catch(e => {
				setLoading(false);
				setModal({ opened: true, type: 'error' });
			});
	};

	const deleteUserMap = id => {
		setLoading(true);

		deleteMap(id)
		  .then(() => {
		    setLoading(false);
		    setModal({ opened: true, type: 'success'});
		  })
		  .catch( e => {
		    setModal({ opened: true, type: 'error'});
		    setLoading(false);
		  });
	};

	return (
		<React.Fragment>
			<Nav />
			<Formik
				initialValues={initialValues}
				validationSchema={validations}
				onSubmit={() => setModal({ opened: true, type: 'confirm'})}
			>
				{({ values, errors, touched, isValid, submitForm, setFieldValue }) => (
					<MapsContext.Provider value={{ mapData, setMapData, userMaps, setPlacesData, searchOrigin, searchDestination, customInfo, setCustomInfo, addMarker, setModal, modal, deleteUserMap, saveMap }}>
						<LoadScript
							googleMapsApiKey="AIzaSyBcy57cjOpe23IqdeOr1apjP--uab3S5Hg"
							libraries={config.libraries}
							onLoad={() => setLoading(false)}
						>
							<div className="section-wrap inline" style={{ flex: '0 1 85%', position: 'relative' }}>
								<MapSidebar searchOrigin={searchOrigin} share={shareLink} submit={() => setModal({ opened: true, type: 'confirm' })} />
								<div className="map-wrap">
									{loading ? (
										<Loader />
									) : (
											<React.Fragment>
												{modal && modal.opened && (
													<Modal modalType={modal?.type} cancel={() => setModal({ opened: false, type: 'confirm' })} submit={modal.action} />
												)}
												<GoogleMap
													mapContainerStyle={config.style}
													center={mapData?.center}
													zoom={mapData?.zoom}
													options={{ styles: mapData?.darkMode ? mapOptions : null }}
												>
													{customInfo?.info && <CustomInfoWindow />}
													{mapData?.markers && mapData?.markers.length && mapData?.markers.map((m, i) => (
														<React.Fragment key={`marker-${i}`}>
															<Marker
																position={m}
															/>
														</React.Fragment>
													))}
													{mapData && mapData.gmap && (
														<DirectionsService
															options={{
																origin: mapData?.center,
																destination: mapData?.destination,
																travelMode: 'WALKING'
															}}
															callback={res => setMapData({...mapData, directionsObject: res})}
														>
															<DirectionsRenderer 
																options={mapData?.directionsObject}
															/>
														</DirectionsService>
													)}
													<Polyline
														options={{
															visible: true,
															editable: true,
															controls: ['LineString', 'Polygon'],
															strokeColor: 'purple',
															strokeOpacity: 1,
															strokeWeight: 5,
															path: mapData && mapData.polylinePath ? mapData.polylinePath : []
														}}
													/>
													<DrawingManager
														onMarkerComplete={m => addMarker(m)}
														options={{
															drawingMode: mapData?.drawingMode,
															polylineOptions: {
																controls: ['Point', 'LineString', 'Polygon'],
																fillColor: "red",
																strokeColor: 'purple',
																strokeOpacity: 1,
																strokeWeight: 5
															}
														}}
														onPolylineComplete={savePath}
													/>
												</GoogleMap>
											</React.Fragment>
										)}
								</div>
							</div>
						</LoadScript>
					</MapsContext.Provider>
				)}
			</Formik>
		</React.Fragment>
	);
};

