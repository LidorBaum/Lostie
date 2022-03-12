<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <div class="home-page">
        <div class="hero">
            <p>Welcome to <strong>Lostie</strong></p>
            <div class="nfc-tag">
                <img
                    src="https://res.cloudinary.com/echoshare/image/upload/v1646569388/Lostie/sparki_qoj0gr.png"
                />
            </div>
        </div>
        <div class="gmap-about-container">
            <div class="about">
                <h1>What is Lostie?</h1>
                <p>
                    Lostie is your way to ensure that if your pet is lost,
                    everyone with a smartphone will be able to know how to
                    contact you when he's found. Join now to X peoples and Y
                    pets that are already using Lostie tags.
                </p>
            </div>
            <div class="gmap">
                <GMapMap
                    :center="mapCenter"
                    :zoom="mapCenter.zoom"
                    map-type-id="terrain"
                    :options="options"
                >
                    <GMapCluster
                        :minimumClusterSize="5"
                        :zoomOnClick="true"
                        :maxZoom="10"
                        :styles="clusterIcon"
                    >
                        <GMapMarker
                            :icon="
                                m.id < 99
                                    ? {
                                          url: 'https://res.cloudinary.com/echoshare/image/upload/v1647042668/Lostie/Paw_Print_jalprc.png',
                                          scaledSize: { width: 70, height: 85 },
                                      }
                                    : ''
                            "
                            :key="index"
                            label="V"
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
                                <h1 class="iw">{{ m.position }}{{ m.id }}</h1>
                                <h1 class="iw">{{ m.name }}</h1>
                            </GMapInfoWindow>
                        </GMapMarker>
                    </GMapCluster>
                </GMapMap>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import {
    GMapMap,
    GMapMarker,
    GMapInfoWindow,
    GMapCluster,
} from '@fawmi/vue-google-maps';
import { ref, onMounted } from 'vue';
import {
    mapStyleGreen,
    mapStyleDark,
    mapStyleDarkBlue,
    vetsDemo,
} from '../services/utils';
import userService from '../services/userService';
import httpService from '../services/httpService';

export default {
    setup() {
        const mapCenter = ref({ lat: 31.9730015, lng: 34.7925013, zoom: 5 });
        const options = ref(mapStyleDarkBlue);
        const openedMarkerID = ref(null);
        const clusterIcon = ref([
            {
                textColor:'black',
                url: 'https://res.cloudinary.com/echoshare/image/upload/c_scale,w_65/v1646929359/Lostie/clusterPaw_rmmnt2.png',
                    anchorIcon: [50, 50 ],
                    anchorText: [35, 22],
                    textSize: '20',
            },
        ]);
        const markers = ref([]);
        window.markers = markers;
        const getUserLocation = () => {
            return navigator.geolocation.getCurrentPosition(
                position => {
                    mapCenter.value.lat = position.coords.latitude;
                    mapCenter.value.lng = position.coords.longitude;
                    mapCenter.value.zoom = 5;
                    getMarkers(
                        position.coords.latitude,
                        position.coords.longitude
                    );

                    return {
                        userLat: position.coords.latitude,
                        userLng: position.coords.longitude,
                    };
                },
                async error => {
                    console.log(error.message);
                    const res = await navigator.permissions.query({
                        name: 'geolocation',
                    });
                    res.onchange = () => onUserLocationChange();
                    getMarkers(mapCenter.value.lat, mapCenter.value.lng);
                }
            );
        };

        const getMarkers = async (userLat, userLng) => {
            const markersArr = await userService.getAllGeocodes(
                userLat,
                userLng
            );
            const { usersGeos, nearVetsGeos } = markersArr;
            markers.value = [...usersGeos, ...nearVetsGeos];
            console.log(markers.value);
        };

        const onUserLocationChange = async () => {
            await getUserLocation();
        };

        const openMarker = id => {
            openedMarkerID.value = id;
        };

        onMounted(async () => {
            const userGeo = await getUserLocation();
        });

        return {
            mapCenter,
            options,
            markers,
            openMarker,
            openedMarkerID,
            clusterIcon,
        };
    },
    components: {
        HelloWorld,
        GMapMap,
        GMapMarker,
        GMapInfoWindow,
        GMapCluster,
    },
};
</script>
