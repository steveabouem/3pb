import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DrawingManager, Polyline, Marker } from '@react-google-maps/api';
import { Loader } from '../common/Loader';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { MapSidebar } from './MapSidebar';
import { MapsContext } from '../helpers/contexts';
import { createMap, getMaps, deleteMap } from '../helpers/api';
import { Modal } from '../common/Modals';
import { config, mapOptions } from '../helpers/variables';
import { CustomInfoWindow } from './CustomInfoWindow';

export const MapMain = () => {
	const [loading, setLoading] = useState(true);
	//ADIDJAN
	const [mapData, setMapData] = useState({ center: { lat: 5.30966, lng: -4.01266 }, zoom: 14, drawingMode: null, darkMode: false, markers: [] });
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

	const searchLocation = () => {
		let result = placesData?.getPlace().geometry.location;
		setMapData({ ...mapData, zoom: 18, center: { lat: result.lat(), lng: result.lng() } });
		setCustomInfo({ ...customInfo, info: true });
	};

	const addMarker = m => {
		let markers = mapData.markers;
		markers.push(m.position);
		setMapData({ ...mapData, markers });
	};

	const savePath = polyline => {
		setMapData({ ...mapData, polylinePath: polyline.getPath().i })
	};

	const shareLink = () => {
	};

	const submit = () => {
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

	const deleteUserMap = () => {
		setLoading(true);
		console.log({ modal });

		// deleteMap(modal?.params)
		//   .then(() => {
		//     setLoading(false);
		//     setModal({ opened: true, type: 'success'});
		//   })
		//   .catch( e => {
		//     console.log({e});

		//     setModal({ opened: true, type: 'error'});
		//     setLoading(false);
		//   });
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validations}
			onSubmit={() => setModal({ opened: true, type: 'confirm', action: submit })}
		>
			{({ values, errors, touched, isValid, submitForm, setFieldValue }) => (
				<MapsContext.Provider value={{ mapData, setMapData, userMaps, setPlacesData, searchLocation, customInfo, setCustomInfo, addMarker, setModal, deleteUserMap }}>
					<LoadScript
						googleMapsApiKey="AIzaSyBcy57cjOpe23IqdeOr1apjP--uab3S5Hg"
						loadingElement={Loader}
						libraries={config.libraries}
						onLoad={() => setLoading(false)}
					>
						<div className="section-wrap inline" style={{ flex: '0 1 85%', position: 'relative' }}>
							<MapSidebar searchLocation={searchLocation} share={shareLink} submit={() => setModal({ opened: true, type: 'confirm' })} />
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
	);
};

