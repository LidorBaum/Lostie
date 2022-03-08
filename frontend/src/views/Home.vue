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
                :center="mapCenter"
                :zoom="5"
                map-type-id="terrain"
                :options="options"
            >
                <GMapMarker
                    :icon="{
                        url: 'https://res.cloudinary.com/echoshare/image/upload/v1646780698/Lostie/Paw_Print_pplbst.png',
                        scaledSize: { width: 37, height: 37 },
                    }"
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                >
                    <GMapInfoWindow :opened="false">
                        <div><h1>IW</h1></div>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapMap>
        </div>
    </div>
</template>



<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { GMapMap, GMapMarker, GMapInfoWindow } from '@fawmi/vue-google-maps';
import { ref, onMounted } from 'vue';
import { mapStyleGreen, mapStyleDark } from '../services/utils';

export default {
    setup() {
        const mapCenter = ref({ lat: 51.093048, lng: 6.84212 });
        const options = ref(mapStyleGreen);
        const markers = ref([
            {
                position: {
                    lat: 31.9730015,
                    lng: 34.7925013,
                },
            },
            {
                position: {
                    lat: 32.013186,
                    lng: 34.748019,
                },
            },
            {
                position: {
                    lat: 32.8304939,
                    lng: 35.0675388,
                },
            },
            {
                position: {
                    lat: 29.5544708,
                    lng: 34.9403539,
                },
            },
            {
                position: {
                    lat: 32.009506,
                    lng: 34.773048,
                },
            },
            {
                position: {
                    lat: 32.1235787,
                    lng: 34.4342264,
                },
            },
            {
                position: {
                    lat: 32.0702477,
                    lng: 34.7765665,
                },
            },
            {
                position: {
                    lat: 32.0215787,
                    lng: 34.7732264,
                },
            },
            {
                position: {
                    lat: 32.0187073,
                    lng: 34.7394094,
                },
            },
            {
                position: {
                    lat: 32.8328185,
                    lng: 35.0693388,
                },
            },
            {
                position: {
                    lat: 32.0220357,
                    lng: 34.7740891,
                },
            },
        ]);
        const getUserLocation = () => {
            navigator.geolocation.getCurrentPosition(
                position => {
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    mapCenter.value.lat = position.coords.latitude;
                    mapCenter.value.lng = position.coords.longitude;
                },
                async error => {
                    console.log(error.message);
                    const res = await navigator.permissions.query({
                        name: 'geolocation',
                    });
                    res.onchange = () => onUserLocationChange();
                }
            );
        };
        const onUserLocationChange = async () => {
            getUserLocation();
        };
        onMounted(() => {
            setTimeout(() => {
                getUserLocation();
            }, 10);
        });
        return {
            mapCenter,
            options,
            markers,
        };
    },
    components: {
        HelloWorld,
        GMapMap,
        GMapMarker,
        GMapInfoWindow,
    },
};
</script>
