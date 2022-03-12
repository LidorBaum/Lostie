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

const mapStyleDarkBlue = {
    gestureHandling: 'greedy',
    styles: [
        {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#193341',
                },
            ],
        },
        {
            featureType: 'landscape',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#2c5a71',
                },
            ],
        },
        {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#29768a',
                },
                {
                    lightness: -37,
                },
            ],
        },
        {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#406d80',
                },
            ],
        },
        {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#406d80',
                },
            ],
        },
        {
            elementType: 'labels.text.stroke',
            stylers: [
                {
                    visibility: 'on',
                },
                {
                    color: '#3e606f',
                },
                {
                    weight: 2,
                },
                {
                    gamma: 0.84,
                },
            ],
        },
        {
            elementType: 'labels.text.fill',
            stylers: [
                {
                    color: '#ffffff',
                },
            ],
        },
        {
            featureType: 'administrative',
            elementType: 'geometry',
            stylers: [
                {
                    weight: 0.6,
                },
                {
                    color: '#1a3541',
                },
            ],
        },
        {
            elementType: 'labels.icon',
            stylers: [
                {
                    visibility: 'off',
                },
            ],
        },
        {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [
                {
                    color: '#2c5a71',
                },
            ],
        },
    ],
};

const vetsDemo = {
    html_attributions: [],
    results: [
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.0116118,
                    lng: 34.7426265,
                },
                viewport: {
                    northeast: {
                        lat: 32.0130149302915,
                        lng: 34.7439843802915,
                    },
                    southwest: {
                        lat: 32.0103169697085,
                        lng: 34.7412864197085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: 'מרפאה לחיות מחמד - מרכז וטרינרי - ד"ר גיל קרן',
            opening_hours: {
                open_now: false,
            },
            photos: [
                {
                    height: 4032,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/117257090981092307250"\u003eחיים שינברון\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uECIBlYtZNq0NYSTyOlPEVE9BbsuNZ6T4nunvxs7Wb2S46wwmSYSvQuN_9jcJCkSTv3qsx5fZN_h8QZIOzc9xRdSusSpiRHNOiPHMyfkYvenHEbHavVdOJ5yaP8dGEmbtlLahu5A3fPFS3NsElkSwug32N6Rx1rzmMnzMJts4MUG9OXt',
                    width: 3024,
                },
            ],
            place_id: 'ChIJzVp_vQ-zAhURKDY_G6pqdPo',
            plus_code: {
                compound_code: '2P6V+J3 בת ים, ישראל',
                global_code: '8G4P2P6V+J3',
            },
            rating: 4.8,
            reference: 'ChIJzVp_vQ-zAhURKDY_G6pqdPo',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            user_ratings_total: 208,
            vicinity: 'בר אילן 85, בת ים',
        },
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.012689,
                    lng: 34.7423416,
                },
                viewport: {
                    northeast: {
                        lat: 32.01404343029151,
                        lng: 34.74365368029149,
                    },
                    southwest: {
                        lat: 32.01134546970851,
                        lng: 34.7409557197085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: "המרכז לרפואה וטרינרית בת-ים,דר' שרון דנון",
            opening_hours: {
                open_now: false,
            },
            photos: [
                {
                    height: 541,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/100220691816693942601"\u003eהמרכז לרפואה וטרינרית בת-ים,דר&#39; שרון דנון\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uEC5PnUNhnsvyO0JqwG6jQWCQ0wj49d5fTVoaakyi8EVP18CH4fYKeXW58widqeHRuCBtKQxkWj0-ncXwz9YUUnnLvzgQxda6DYihZY-x412M_ncGCbzFQ4Fi3HNy45aMHFJLTHRUBZI1OjchIuQYEbvDk7sOYh_w2yYNaThBPVodVk',
                    width: 960,
                },
            ],
            place_id: 'ChIJuWE16g-zAhUR5OWeoIMgfxA',
            plus_code: {
                compound_code: '2P7R+3W בת ים, ישראל',
                global_code: '8G4P2P7R+3W',
            },
            rating: 4.8,
            reference: 'ChIJuWE16g-zAhUR5OWeoIMgfxA',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            user_ratings_total: 303,
            vicinity: 'בלפור 153, בת ים',
        },
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.0115986,
                    lng: 34.7428645,
                },
                viewport: {
                    northeast: {
                        lat: 32.0129916802915,
                        lng: 34.74422363029149,
                    },
                    southwest: {
                        lat: 32.0102937197085,
                        lng: 34.7415256697085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: 'מרפאה לחיות בית',
            photos: [
                {
                    height: 4032,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/110596479509756788845"\u003eBesa Kviraia\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uECLXjLcdhD4qofyDPsKgonTBcSdebQRYEzY6zhbfBhSM0j6zxifw-mZ-hidGTngLXk6C0TFj9L-4Vap0smevF9dwl9SwHyomQ1RnMrBKpix-95snZJO9DVp9GQJ-8VjLqg0vR1wfRSQY0eoSSNgkKLffABPH9IRj-JR_z80PXKwSAyb',
                    width: 3024,
                },
            ],
            place_id: 'ChIJ9bs6ug-zAhURD7JrpTqoL0g',
            plus_code: {
                compound_code: '2P6V+J4 בת ים, ישראל',
                global_code: '8G4P2P6V+J4',
            },
            reference: 'ChIJ9bs6ug-zAhURD7JrpTqoL0g',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            vicinity: 'בר אילן 83, בת ים',
        },
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.0116118,
                    lng: 34.7426265,
                },
                viewport: {
                    northeast: {
                        lat: 32.0130149302915,
                        lng: 34.7439843802915,
                    },
                    southwest: {
                        lat: 32.0103169697085,
                        lng: 34.7412864197085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: 'pet care',
            opening_hours: {
                open_now: false,
            },
            photos: [
                {
                    height: 4000,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/106285591665607870162"\u003eAnastasia Lifshic\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uEAPYdPmBQbw-Y6YPFd3_DLAZMSzXwT6rVxv5mNO8JUVniXFn2mcg1zOQcE_BhQB_BErwSkCkkKvS0EzKscAlPqThY-kA9A7xzGM0vQ0WaT7N5_9MA3q2V3oaB_mlAe0fw3F2n6cjbv2gRvREXBliGxtpxfkfdFK5FTb3BL3REk1_COq',
                    width: 3000,
                },
            ],
            place_id: 'ChIJ_4-evQ-zAhUR6jkz38jmw5A',
            plus_code: {
                compound_code: '2P6V+J3 בת ים, ישראל',
                global_code: '8G4P2P6V+J3',
            },
            rating: 4.7,
            reference: 'ChIJ_4-evQ-zAhUR6jkz38jmw5A',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            user_ratings_total: 98,
            vicinity: 'בר אילן 85, בת ים',
        },
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.0199148,
                    lng: 34.74357330000001,
                },
                viewport: {
                    northeast: {
                        lat: 32.0212519802915,
                        lng: 34.7448892302915,
                    },
                    southwest: {
                        lat: 32.0185540197085,
                        lng: 34.7421912697085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: 'המרכז הוטרינרי לחיות מחמד',
            opening_hours: {
                open_now: false,
            },
            photos: [
                {
                    height: 4032,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/114179911949215464515"\u003eOrit Kohavy Coplin\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uEDB5KRzvRLfrYz8z4GA7rVdD_WT62yiZblpLPN0AKqx9hq91Q_uTboXiv6OSsLb6nhSvLytPrUPfoH2OthxwFbtRla6YIWp3yTmkU5k-ub5OTPmKA9QpK3aQDCpVKpIk_kzSyh-rS8xwFNyj-9rDT3Ha5R09E4IGoRqZ0Deu1dG0LCg',
                    width: 3024,
                },
            ],
            place_id: 'ChIJ61fOAhezAhURsPW6jNtaj2s',
            plus_code: {
                compound_code: '2P9V+XC בת ים, ישראל',
                global_code: '8G4P2P9V+XC',
            },
            rating: 4.7,
            reference: 'ChIJ61fOAhezAhURsPW6jNtaj2s',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            user_ratings_total: 142,
            vicinity: 'בת ים',
        },
        {
            business_status: 'OPERATIONAL',
            geometry: {
                location: {
                    lat: 32.0071122,
                    lng: 34.75380259999999,
                },
                viewport: {
                    northeast: {
                        lat: 32.00862533029149,
                        lng: 34.7551967302915,
                    },
                    southwest: {
                        lat: 32.0059273697085,
                        lng: 34.7524987697085,
                    },
                },
            },
            icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
            icon_background_color: '#7B9EB0',
            icon_mask_base_uri:
                'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
            name: 'מרפאה וטרינרית לחיות בית',
            photos: [
                {
                    height: 1600,
                    html_attributions: [
                        '\u003ca href="https://maps.google.com/maps/contrib/113363466795943185249"\u003eAlexsander Kosnitser\u003c/a\u003e',
                    ],
                    photo_reference:
                        'Aap_uEB-SVpLYvYu7fvKkJ0yHU-D1HsnvBKFINvyOam8wbIZzcIYQT0SrKXF3WjP0rQABYDhaB5Ioj4VJTRKjC1dT2HrCh2HWWF9UwGn_6sJGunJ7SyLa2--GKTpNYjPUGqpg7ij2b9Ervc5d544KB0433vQurYyC1BTqZ4c0R0Br9zUVGZW',
                    width: 1200,
                },
            ],
            place_id: 'ChIJBUlAHHOzAhURKaorhp9_FQs',
            plus_code: {
                compound_code: '2Q43+RG בת ים, ישראל',
                global_code: '8G4P2Q43+RG',
            },
            rating: 4.9,
            reference: 'ChIJBUlAHHOzAhURKaorhp9_FQs',
            scope: 'GOOGLE',
            types: ['veterinary_care', 'point_of_interest', 'establishment'],
            user_ratings_total: 16,
            vicinity: 'הרב מימון 26, בת ים',
        },
    ],
    status: 'OK',
};
module.exports = {
    mapStyleGreen,
    mapStyleDark,
    mapStyleDarkBlue,
    vetsDemo,
};
