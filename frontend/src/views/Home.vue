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
                        scaledSize: { width: 42, height: 42 },
                    }"
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    @click="openMarker(m.id)"
                    @closeclick="openMarker(null)"
                >
                    <GMapInfoWindow
                        :closeclick="true"
                        @closeclick="openMarker(null)"
                        :opened="openedMarkerID === m.id"
                        :options="{
                            pixelOffset: {
                                width: 10,
                                height: 0,
                            },
                            maxWidth: 320,
                            maxHeight: 320,
                        }"
                    >
                        <h1 class="iw">{{ m.position }}</h1>
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
import userService from '../services/userService';

export default {
    setup() {
        const mapCenter = ref({ lat: 51.093048, lng: 6.84212 });
        const options = ref(mapStyleGreen);
        const openedMarkerID = ref(null);
        const markers = ref([]);
        window.markers = markers;
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

        const getMarkers = async () => {
            const markersArr = await userService.getAllGeocodes();
            markers.value = markersArr;
        };

        const onUserLocationChange = async () => {
            getUserLocation();
        };

        const openMarker = id => {
            openedMarkerID.value = id;
        };

        onMounted(() => {
            setTimeout(() => {
                getUserLocation();
                getMarkers();
            }, 10);
        });
        return {
            mapCenter,
            options,
            markers,
            openMarker,
            openedMarkerID,
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
