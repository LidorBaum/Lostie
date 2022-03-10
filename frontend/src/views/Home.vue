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
                    :zoom="5"
                    map-type-id="terrain"
                    :options="options"
                >
                    <GMapMarker
                        :icon="
                            m.id < 99
                                ? {
                                      url: 'https://res.cloudinary.com/echoshare/image/upload/v1646780698/Lostie/Paw_Print_pplbst.png',
                                      scaledSize: { width: 42, height: 42 },
                                  }
                                : ''
                        "
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
                            <h1 class="iw">{{ m.position }}{{m.id}}</h1>
                        </GMapInfoWindow>
                    </GMapMarker>
                </GMapMap>
            </div>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import { GMapMap, GMapMarker, GMapInfoWindow } from '@fawmi/vue-google-maps';
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
        const mapCenter = ref({ lat: 51.093048, lng: 6.84212 });
        const options = ref(mapStyleDarkBlue);
        const openedMarkerID = ref(null);
        const markers = ref([]);
        window.markers = markers;
        const getUserLocation = async () => {
            navigator.geolocation.getCurrentPosition(
                async position => {
                    console.log(position.coords.latitude);
                    console.log(position.coords.longitude);
                    mapCenter.value.lat = position.coords.latitude;
                    mapCenter.value.lng = position.coords.longitude;
                    // const res = await fetch(
                    //     `https://maps.googleapis.com/maps/api/place/search/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1000&types=veterinary_care&sensor=false&key=AIzaSyA0PnKw6ClT_i8_c4ePtiXRLg7MjyC4VCA`,
                    //     { method: 'GET' }
                    // );
                    // const nearVets = await res.json()
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
            const nearVets = vetsDemo;
            nearVets.results.forEach((vet, idx) => {
                markersArr.push({id: (idx*100)+100, position: vet.geometry.location })
                console.log(vet);
            });            
            markers.value = [...markers.value, ...markersArr];

            console.log(markers.value);
        };

        const onUserLocationChange = async () => {
            getUserLocation();
        };

        const openMarker = id => {
            openedMarkerID.value = id;
        };

        onMounted(() => {
            setTimeout(async () => {
                await getUserLocation();
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
