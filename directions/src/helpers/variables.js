export const mapStyles = {
    main: { height: '100%', width: '100%', flex: 1, alignSelf: 'center', position: 'relative', overflow: 'hidden' },
    searchOrigin: { height: '70px', width: '370px', position: 'absolute', left: '1%', top: '1%' },
    searchDestination: {},
    marker: {}
};

export const modes = { marker: 'marker', polyline: 'polyline' };

export const config = {
    libraries: ['drawing', 'places'],
    style: mapStyles.main,
    types: ['geocode', 'cities'],
    fields: ['name']
};

export const mapOptions = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
    },
    {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
    },
    {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
    },
    {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
    },
    {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
    },
    {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
    },
    {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
    },
    {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
    },
    {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
    }
];

export const content = {
    landing: {
        tagline: `Envie de commander un bon Garba, visiter la nouvelle maison du beau-frère, ou simplement vous rendre
            à un rendez-vous important? Alors, fini les longs appels interminables et frustrant afin d’expliquer
            la route ou retrouver la place où vous devez vous rendre. Les cartes OU-T vous permette de faire cela en quelques clics.`,
        step1: `Sélectionnez le point d'intérêt principal le plus proche de la destination finale(votre addresse).
            Ex: L’eglise St Jacques, La pharmacie de Koumassi, Le rond point Riviera 3 (9 Kilo), etc.
            Vous pouvez rechercher dans la barre de recherche ou directement sur la carte
            Épingler l'emplacement sur la carte.
            (Option pour sélectionner ou épingler un deuxième emplacement sur la carte).`,
        step2: `Sélectionnez l'outil de traçage (Add Image) pour commencer à dessiner la trajectoire. Commencer à dessiner à partir du premier point d'intérêt principal, jusqu’à la destination finale. 
            Épingler l'emplacement de la destination finale sur la carte.`,
        step3: ` Une fois que vous êtes satisfait de votre carte, n'oubliez pas d'ajouter un titre (Ex: Maison Celestin Koffi_Rivieria 2)
            N’oubliez pas d'enregistrer votre carte (vous devrez vous connecter pour enregistrer votre carte)
            Copiez et partagez le lien.`,
    },
    map: {

    }
};