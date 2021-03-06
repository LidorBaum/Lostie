<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <h1 class="order-page-title">Order Your Own Lostie Tag</h1>
    <Transition name="fade-in" mode="out-in">
        <div class="order-page" v-if="products">
            <div class="order-container">
                <div class="order-form-container">
                    <form
                        id="order-form"
                        class="order-form"
                        @submit.prevent="onPlaceOrder"
                    >
                        <h2>Pet Info</h2>
                        <div class="fields">
                            <InputText
                                id="petName"
                                type="text"
                                v-model="orderForm.petName"
                                autofocus
                                placeholder="Pet Name"
                                class="inputField"
                            />
                            <div class="inputField">
                                <span @click="() => onSwitchBreedInput('drop')">
                                    <Dropdown
                                        v-model="orderForm.breed"
                                        :options="dogBreeds"
                                        placeholder="Select Breed"
                                        :showClear="true"
                                        :disabled="!isBreedFromList"
                                        class="dropdown"
                                    >
                                        <template #value="slotProps">
                                            <div
                                                class="breed-item breed-item-value"
                                                v-if="slotProps.value"
                                            >
                                                <div>
                                                    {{ slotProps.value }}
                                                </div>
                                            </div>
                                            <span v-else>
                                                {{ slotProps.placeholder }}
                                            </span>
                                        </template>
                                        <template #option="slotProps">
                                            <div class="breed-item">
                                                <div>
                                                    {{ slotProps.option }}
                                                </div>
                                            </div>
                                        </template>
                                    </Dropdown>
                                </span>
                                <div class="other-input">
                                    <span> Other: </span>
                                    <span
                                        @click="
                                            () => onSwitchBreedInput('text')
                                        "
                                    >
                                        <InputText
                                            class="ots"
                                            :disabled="isBreedFromList"
                                            v-model="orderFormBreedText"
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
                            <div class="gender-div">
                                <span>Gender:</span
                                ><ToggleButton
                                    v-model="orderForm.gender"
                                    onLabel="Male"
                                    offLabel="Female"
                                />
                            </div>
                            <Textarea
                                v-model="orderForm.description"
                                :autoResize="true"
                                rows="2"
                                cols="20"
                                placeholder="Description"
                                class="inputField"
                            />

                            <div className="form-img">
                                <label htmlFor="img-input">
                                    <img
                                        alt="profile img"
                                        className="primary-img"
                                        :src="orderForm.image"
                                    />
                                    <input
                                        id="img-input"
                                        hidden
                                        type="file"
                                        @change="onUploadImg"
                                    />
                                </label>
                            </div>
                        </div>
                        <h2>Tag Style</h2>
                        <div class="product-list">
                            <article
                                class="product-card"
                                v-for="product in products"
                                :key="product._id"
                                v-tooltip.top="`${product.title}`"
                                @click="() => selectProduct(product._id)"
                            >
                                <img
                                    class="product-image"
                                    :src="product.image"
                                    :class="
                                        product._id === orderForm.productId
                                            ? 'selected'
                                            : ''
                                    "
                                />
                            </article>
                        </div>
                    </form>
                </div>
                <div class="image-container">
                    <div class="spacer"></div>
                    <div class="example-image-container">
                        <img
                            class="background-collar"
                            src="https://res.cloudinary.com/echoshare/image/upload/v1646336671/Lostie/w2jhvyoso7lcml5jcbyj.jpg"
                        />
                        <img
                            class="tag-image"
                            :src="getSelectedProductImage()"
                        />
                    </div>
                    <Button
                        label="Place Order"
                        type="submit"
                        form="order-form"
                    />
                </div>
            </div>
        </div>

        <div v-else class="loader-div">
            <FingerprintSpinner
                :animation-duration="1400"
                :size="300"
                color="#15b485"
            />
        </div>
    </Transition>
</template>

<script>
import { useNotificationStore } from '../store/useNotification';
import { onMounted, reactive, ref } from 'vue';
import { useUserStore } from '../store/useUser';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import productService from '../services/productService';
import orderService from '../services/orderService';
import { FingerprintSpinner } from 'epic-spinners';
import { uploadImg } from '../services/cloudinaryService';

export default {
    components: {
        FingerprintSpinner,
    },
    setup() {
        const userStore = useUserStore();
        const { loggedUser } = storeToRefs(userStore);
        const notificationStore = useNotificationStore();
        const router = useRouter();
        const products = ref(null);
        const orderForm = reactive({
            petName: '',
            image: 'https://res.cloudinary.com/echoshare/image/upload/v1646337100/Lostie/59-590299_transparent-download-husky-dog-silhouette-at-getdrawings-french_a3paqy.png',
            breed: '',
            gender: true,
            description: '',
            productId: '',
            userId: '',
        });
        const isBreedFromList = ref(true);
        const orderFormBreedText = ref('');

        const getAvailableProducts = async () => {
            const res = await productService.getAllProducts();
            if (res.error) {
                return notificationStore.newNotification(
                    'error',
                    res.error.message
                );
            }
            products.value = res;
        };

        const selectProduct = id => {
            if (orderForm.productId === id) return (orderForm.productId = '');
            orderForm.productId = id;
        };

        onMounted(() => {
            getAvailableProducts();
        });

        const onPlaceOrder = async () => {
            const orderFormRaw = { ...orderForm };
            console.log(orderFormRaw);
            orderFormRaw.userId = loggedUser.value._id;
            orderFormRaw.gender = orderForm.gender ? 'Male' : 'Female';
            orderFormRaw.breed = orderFormRaw.breed
                ? orderFormRaw.breed
                : orderFormBreedText.value;
            if (Object.values(orderFormRaw).some(field => !field)) {
                return notificationStore.newNotification(
                    'error',
                    'Please fill all the fields'
                );
            }
            if (
                orderFormRaw.image ===
                'https://res.cloudinary.com/echoshare/image/upload/v1646337100/Lostie/59-590299_transparent-download-husky-dog-silhouette-at-getdrawings-french_a3paqy.png'
            )
                return notificationStore.newNotification(
                    'warn',
                    'Please upload a photo'
                );
            const order = await orderService.createOrder({ ...orderFormRaw });
            if (order.error) {
                return notificationStore.newNotification(
                    'error',
                    order.error.message
                );
            }
            notificationStore.newNotification('success', 'Order Placed!');
            return router.push('/profile');
        };

        const onSwitchBreedInput = fieldName => {
            isBreedFromList.value = fieldName !== 'text';
            if (fieldName === 'text') {
                orderForm.breed = '';
            } else {
                orderFormBreedText.value = '';
            }
        };

        const getSelectedProductImage = () => {
            if (!orderForm.productId) return '';
            const prod = products.value.find(
                prod => prod._id === orderForm.productId
            );
            return prod.image;
        };

        const onUploadImg = async e => {
            const url = await uploadImg(e);
            if (!url) {
                return notificationStore.newNotification(
                    'error',
                    'Oops, could not upload the image. please try again.'
                );
            }
            orderForm.image = url;
        };

        const genderOptions = ref(['Male', 'Female']);
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
            orderForm,
            products,
            dogBreeds,
            genderOptions,
            selectProduct,
            onUploadImg,
            onPlaceOrder,
            getSelectedProductImage,
            onSwitchBreedInput,
            isBreedFromList,
            orderFormBreedText,
        };
    },
};
</script>
<style>
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
