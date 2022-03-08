const mapStyleGreen = {
    gestureHandling: 'greedy',
    styles: [
        {
            featureType: 'all',
            elementType: 'all',
            stylers: [
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'all',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
                {
                    saturation: '-100',
                },
            ],
        },
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    saturation: 36,
                },
                {
                    color: '#000000',
                },
                {
                    lightness: 40,
                },
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off',
                },
                {
                    color: '#000000',
                },
                {
                    lightness: 16,
                },
            ],
        },
        {
            featureType: 'all',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 20,
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 17,
                },
                {
                    weight: 1.2,
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 20,
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#4d6059',
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#4d6059',
                },
            ],
        },
        {
            featureType: 'landscape.natural',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#4d6059',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    lightness: 21,
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#4d6059',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#4d6059',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#7f8d89',
                },
                {
                    lightness: 17,
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#7f8d89',
                },
                {
                    lightness: 29,
                },
                {
                    weight: 0.2,
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 18,
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 16,
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#7f8d89',
                },
            ],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 19,
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    color: '#2b3638',
                },
                {
                    visibility: 'on',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#2b3638',
                },
                {
                    lightness: 17,
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#24282b',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#24282b',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
    ],
};

const mapStyleDark = {
    gestureHandling: 'greedy',

    styles: [
        {
            featureType: 'all',
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'all',
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    color: '#000000',
                },
                {
                    lightness: 13,
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#000000',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#144b53',
                },
                {
                    lightness: 14,
                },
                {
                    weight: 1.4,
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'all',
            stylers: [
                {
                    color: '#08304b',
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#0c4152',
                },
                {
                    lightness: 5,
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#000000',
                },
            ],
        },
        {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#0b434f',
                },
                {
                    lightness: 25,
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.fill',
            stylers: [
                {
                    color: '#000000',
                },
            ],
        },
        {
            featureType: 'road.arterial',
            elementType: 'geometry.stroke',
            stylers: [
                {
                    color: '#0b3d51',
                },
                {
                    lightness: 16,
                },
            ],
        },
        {
            featureType: 'road.local',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#000000',
                },
            ],
        },
        {
            featureType: 'transit',
            elementType: 'all',
            stylers: [
                {
                    color: '#146474',
                },
            ],
        },
        {
            featureType: 'water',
            elementType: 'all',
            stylers: [
                {
                    color: '#021019',
                },
            ],
        },
    ],
};
module.exports = {
    mapStyleGreen,
    mapStyleDark,
};
