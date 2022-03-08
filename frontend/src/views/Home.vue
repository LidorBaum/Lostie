<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <div class="home-page">
        <div class="hero">
            <p>Welcome to <strong>Lostie</strong></p>
            <div class="nfc-tag">
                <img
                    src="https://res.cloudinary.com/echoshare/image/upload/v1646151480/Lostie/lostienfc_tgat3x.png"
                />
            </div>
        </div>
        <div class="gmap">
            <GMapMap
                :center="{ lat: 32.0155119, lng: 34.7456619 }"
                :zoom="18"
                map-type-id="terrain"
                :options="options"
            >
            </GMapMap>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { GMapMap } from '@fawmi/vue-google-maps';
export default {
    name: 'Home',
    components: {
        HelloWorld,
        GMapMap,
    },
    data() {
        return {
            center: { lat: 51.093048, lng: 6.84212 },
            options: {
                styles: [
                    // he comes the styles your
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
            },
        };
    },
};
</script>
