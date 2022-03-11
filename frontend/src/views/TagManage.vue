<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <Transition name="fade-in" mode="out-in">
        <div class="tag-manage" v-if="tagObj">
            <div class="tag-info">
                <Transition name="switch" mode="out-in">
                    <div
                        class="edit-info-container"
                        v-if="tagFormIsEditingMap.petName"
                    >
                        <div class="data">
                            <InputText
                                id="petName"
                                type="text"
                                v-model="tagForm.petName"
                                placeholder="Pet Name"
                                required
                                v-on:keyup.enter="() => onSaveChange('petName')"
                                v-on:keyup.esc="() => onCancelChange('petName')"
                                class="inputField"
                            />
                        </div>
                        <div class="btns">
                            <SaveCancelBtns
                                fieldName="petName"
                                @onSave="onSaveChange"
                                @onCancel="onCancelChange"
                            />
                        </div>
                    </div>
                    <div v-else class="show-info-container">
                        <div class="data">
                            <h1>Pet Name: {{ tagObj.petName }}</h1>
                        </div>
                        <div class="btns">
                            <EditFieldBtn
                                fieldName="petName"
                                @onEditField="onEditField"
                            />
                        </div>
                    </div>
                </Transition>
                <Transition name="switch" mode="out-in">
                    <div
                        class="edit-info-container"
                        v-if="tagFormIsEditingMap.breed"
                    >
                        <div class="data dropdown-other">
                            <span @click="() => onSwitchBreedInput('drop')">
                                <Dropdown
                                    v-model="tagForm.breed"
                                    :options="dogBreeds"
                                    placeholder="Select Breed"
                                    :showClear="true"
                                    class="dropdown"
                                    v-on:keyup.enter="
                                        () => onSaveChange('breed')
                                    "
                                    v-on:keyup.esc="
                                        () => onCancelChange('breed')
                                    "
                                    :disabled="!isBreedFromList"
                                >
                                    <template #value="slotProps">
                                        <div
                                            class="breed-item breed-item-value"
                                            v-if="slotProps.value"
                                        >
                                            <div>{{ slotProps.value }}</div>
                                        </div>
                                        <span v-else>
                                            {{ slotProps.placeholder }}
                                        </span>
                                    </template>
                                    <template #option="slotProps">
                                        <div class="breed-item">
                                            <div>{{ slotProps.option }}</div>
                                        </div>
                                    </template>
                                </Dropdown>
                            </span>
                            <div class="other-input">
                                <span> Other: </span>
                                <span @click="() => onSwitchBreedInput('text')">
                                    <InputText
                                        class="ots"
                                        :disabled="isBreedFromList"
                                        v-model="tagFormBreedText"
                                        v-on:keyup.enter="
                                            () => onSaveChange('breed')
                                        "
                                        v-on:keyup.esc="
                                            () => onCancelChange('breed')
                                        "
                                    />
                                </span>
                            </div>
                        </div>
                        <div class="btns">
                            <SaveCancelBtns
                                fieldName="breed"
                                @onSave="onSaveChange"
                                @onCancel="onCancelChange"
                            />
                        </div>
                    </div>
                    <div v-else class="show-info-container">
                        <div class="data">
                            <h2>Breed: {{ tagObj.breed }}</h2>
                        </div>
                        <div class="btns">
                            <EditFieldBtn
                                fieldName="breed"
                                @onEditField="onEditField"
                            />
                        </div>
                    </div>
                </Transition>
                <Transition name="switch" mode="out-in">
                    <div
                        class="edit-info-container"
                        v-if="tagFormIsEditingMap.gender"
                    >
                        <div class="data">
                            <ToggleButton
                                v-model="tagForm.gender"
                                onLabel="Male"
                                offLabel="Female"
                            />
                        </div>
                        <div class="btns">
                            <SaveCancelBtns
                                fieldName="gender"
                                @onSave="onSaveChange"
                                @onCancel="onCancelChange"
                            />
                        </div>
                    </div>
                    <div v-else class="show-info-container">
                        <div class="data">
                            <h2>Gender: {{ tagObj.gender }}</h2>
                        </div>
                        <div class="btns">
                            <EditFieldBtn
                                fieldName="gender"
                                @onEditField="onEditField"
                            />
                        </div>
                    </div>
                </Transition>
                <Transition name="switch" mode="out-in">
                    <div
                        class="edit-info-container"
                        v-if="tagFormIsEditingMap.description"
                    >
                        <div class="data">
                            <Textarea
                                v-model="tagForm.description"
                                :autoResize="false"
                                rows="2"
                                cols="20"
                                class="textAreaField"
                            />
                        </div>
                        <div class="btns">
                            <SaveCancelBtns
                                fieldName="description"
                                @onSave="onSaveChange"
                                @onCancel="onCancelChange"
                            />
                        </div>
                    </div>
                    <div v-else class="show-info-container">
                        <div class="data">
                            <h2>
                                Description:
                                <p>{{ tagObj.description }}</p>
                            </h2>
                        </div>
                        <div class="btns">
                            <EditFieldBtn
                                fieldName="description"
                                @onEditField="onEditField"
                            />
                        </div>
                    </div>
                </Transition>
                <Transition name="switch" mode="out-in">
                    <div
                        class="edit-info-container"
                        v-if="tagFormIsEditingMap.status"
                    >
                        <div class="data">
                            <Dropdown
                                v-model="tagForm.status"
                                :options="availableStatusOptions"
                                :placeholder="`${tagForm.status}`"
                                class="inputField"
                                v-on:keyup.enter="() => onSaveChange('status')"
                                v-on:keyup.esc="() => onCancelChange('status')"
                                :class="isGlowField ? 'glow' : 'unglow'"
                            />
                        </div>
                        <div class="btns">
                            <SaveCancelBtns
                                fieldName="status"
                                @onSave="onSaveChange"
                                @onCancel="onCancelChange"
                            />
                        </div>
                    </div>
                    <div v-else class="show-info-container">
                        <div class="data">
                            <h2>
                                Status:
                                {{ tagObj.status }}
                            </h2>
                        </div>
                        <div class="btns">
                            <EditFieldBtn
                                fieldName="status"
                                @onEditField="onEditField"
                            />
                        </div>
                    </div>
                </Transition>
                <div
                    class="edit-info-container image-field"
                    v-if="tagFormIsEditingMap.image"
                >
                    <div class="data">
                        <label
                            htmlFor="img-input"
                            v-tooltip.top="'click to replace photo'"
                        >
                            <img
                                alt="profile img"
                                className="primary-img clickable"
                                :src="newPhotoURL ? newPhotoURL : tagObj.image"
                            />
                            <input
                                id="img-input"
                                hidden
                                type="file"
                                @change="onUploadImg"
                            />
                        </label>
                    </div>
                    <div class="btns">
                        <SaveCancelBtns
                            fieldName="image"
                            @onSave="onSaveChange"
                            @onCancel="onCancelChange"
                        />
                    </div>
                </div>
                <div v-else class="show-info-container image-field">
                    <div class="data">
                        <img
                            alt="profile img"
                            className="primary-img"
                            :src="newPhotoURL ? newPhotoURL : tagObj.image"
                        />
                    </div>
                    <div class="btns">
                        <EditFieldBtn
                            fieldName="image"
                            @onEditField="onEditField"
                        />
                    </div>
                </div>
            </div>
            <div class="tag-scan-preview">
                <TagScan :tagObj="tagObj" />
            </div>
        </div>

        <div v-else class="loader-div">
            <FingerprintSpinner
                :animation-duration="1300"
                :size="300"
                color="#15b485"
            />
        </div>
    </Transition>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from 'vue';
import tagService from '../services/tagService.js';
import { FingerprintSpinner } from 'epic-spinners';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from '../store/useUser';
import { storeToRefs } from 'pinia';
import SaveCancelBtns from '../components/SaveCancelBtns.vue';
import EditFieldBtn from '../components/EditFieldBtn.vue';
import TagScan from './TagScan.vue';
import { useNotificationStore } from '../store/useNotification';
import { uploadImg } from '../services/cloudinaryService';

export default {
    components: {
        FingerprintSpinner,
        TagScan,
        SaveCancelBtns,
        EditFieldBtn,
    },
    setup() {
        const userStore = useUserStore();
        const { loggedUser } = storeToRefs(userStore);
        const notificationStore = useNotificationStore();
        const availableStatusOptions = ref([]);
        const tagForm = reactive({
            petName: '',
            image: 'https://res.cloudinary.com/echoshare/image/upload/v1646337100/Lostie/59-590299_transparent-download-husky-dog-silhouette-at-getdrawings-french_a3paqy.png',
            breed: '',
            gender: true,
            description: '',
            status: '',
        });
        const statusOptions = {
            Pending: ['Active'],
            Active: ['Lost', 'Inactive'],
            Lost: ['Active', 'Inactive'],
            Inactive: ['Active'],
        };
        //need this var to maintain both old and new photos in the same time
        const newPhotoURL = ref('');

        const isGlowField = ref(false);
        const tagFormBreedText = ref('');

        const isBreedFromList = ref(true);

        //I need to know which fields are currently being edited.
        const getEmptyEditingMap = () => {
            const mapObj = {};
            const keysArray = Object.keys({ ...tagForm });
            keysArray.forEach(key => (mapObj[key] = false));
            return mapObj;
        };
        const tagFormIsEditingMap = reactive(getEmptyEditingMap());

        const route = useRoute();

        let tagObj = ref(null);

        const onEditField = fieldName => {
            tagFormIsEditingMap[fieldName] = true;
        };

        const onSaveChange = async fieldName => {
            const updatedTagObj = {};
            if (fieldName === 'image') tagForm.image = newPhotoURL.value;
            Object.assign(updatedTagObj, tagObj.value); //Get the initial TAG data (for the unchanged fields)
            Object.assign(updatedTagObj, { ...tagForm }); //get the changed data from the FORM
            updatedTagObj.gender = updatedTagObj.gender ? 'Male' : 'Female'; //Return  from Primes' toggle boolean to string
            updatedTagObj.breed = tagForm.breed
                ? tagForm.breed
                : tagFormBreedText.value;
            if (Object.values({ ...updatedTagObj }).some(field => !field)) {
                return notificationStore.newNotification(
                    'error',
                    `Please fill up the ${
                        fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                    }`
                );
            }
            const updatedTag = await tagService.updateTag(updatedTagObj);
            if (updatedTag.error) {
                return notificationStore.newNotification(
                    'error',
                    updatedTag.error.message
                );
            }
            notificationStore.newNotification('success', 'Saved');
            // Object.assign(tagObj.value, updatedTag);
            tagObj.value = { ...tagObj.value, ...updatedTag };
            availableStatusOptions.value = statusOptions[tagObj.value?.status];
            if (fieldName === 'status')
                availableStatusOptions.value =
                    statusOptions[tagObj.value?.status];

            tagFormIsEditingMap[fieldName] = false;
        };

        const onCancelChange = fieldName => {
            tagFormIsEditingMap[fieldName] = false;
            if (fieldName === 'gender')
                return (tagForm.gender = tagObj.value.gender === 'Male');
            if (fieldName === 'image') return (newPhotoURL.value = '');
            tagForm[fieldName] = tagObj.value[fieldName];
        };

        const onSwitchBreedInput = fieldName => {
            isBreedFromList.value = fieldName !== 'text';
            if (fieldName === 'text') {
                tagForm.breed = '';
            } else {
                tagFormBreedText.value = '';
            }
        };

        const fetchTagObj = async tagId => {
            if (!loggedUser.value) return;
            console.log(`fetching ${tagId} from db`);
            const tag = await tagService.getTagByIdForScan(tagId);
            if (tag.error) {
                return notificationStore.newNotification(
                    'error',
                    tag.error.message
                );
            }
            if (tag.status === 'Pending') {
                notificationStore.newNotification(
                    'info',
                    "Recieved your new tag? Don't forget to activate it here!",
                    10000
                );
                onEditField('status');
                isGlowField.value = true;
                const interval = setInterval(() => {
                    isGlowField.value = !isGlowField.value;
                }, 1000);
                setTimeout(() => {
                    isGlowField.value = false;
                    clearInterval(interval);
                }, 7000);
            }
            //NOTIFICATION ON ERROR !
            tagObj.value = tag;
        };

        const onUploadImg = async e => {
            const url = await uploadImg(e);
            if (!url) {
                return notificationStore.newNotification(
                    'error',
                    'Oops, could not upload the image. please try again.'
                );
            }
            newPhotoURL.value = url;
        };

        const prepareEditInfoForm = () => {
            if (!loggedUser.value) return;
            Object.assign(tagForm, tagObj.value);
            tagForm.gender = tagForm.gender === 'Male';
            availableStatusOptions.value = statusOptions[tagObj.value?.status];
        };

        userStore.$subscribe((mutation, state) => {
            // console.log(tagObj.value);
            // if(tagObj.value?._id === route.params.id) console.log('same same new name');
            // const tagId = route.params.id;
            // fetchTagObj(tagId);
            // prepareEditInfoForm();
        });

        onMounted(() => {
            setTimeout(async () => {
                const tagId = route.params.id;
                console.log(tagId, 'tagid onmounted');
                await fetchTagObj(tagId);
                prepareEditInfoForm();
            }, 1000);
        });

        const dogBreeds = ref([
            'Husky',
            'German Shepard',
            'Labrador Retriever',
            'Golden Retriever',
            'Bulldog',
            'Poodle',
            'Beagle',
            'Yorkshire Terrier',
            'Boxer',
            'Rottweiler',
        ]);
        return {
            tagObj,
            tagForm,
            tagFormIsEditingMap,
            onCancelChange,
            onEditField,
            onSaveChange,
            availableStatusOptions,
            dogBreeds,
            isBreedFromList,
            onSwitchBreedInput,
            tagFormBreedText,
            isGlowField,
            onUploadImg,
            newPhotoURL,
        };
    },
};
//watch on the gender
</script>
<style>
.switch-enter-from,
.switch-leave-to {
    opacity: 0;
    overflow: hidden;
    /* transform: translateY(20px); */
}
.switch-enter-active {
    transition: all 0.2s ease-out;
}
.switch-leave-active {
    transition: all 0.2s ease-out;
}
.fade-in-enter-from,
.fade-in-leave-to {
    opacity: 0;
    overflow: hidden;
    /* transform: translateY(20px); */
}
.fade-in-enter-active {
    transition: all 0.8s ease-out;
}
.fade-in-leave-active {
    transition: all 0.8s ease-out;
}
</style>
