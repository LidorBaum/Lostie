<template>
  <div class="order-page">
    <div v-if="products">
      <h1>Place New Order</h1>
      <form id="order-form" class="order-form" @submit.prevent="tryLogin">
        <InputText
          id="petName"
          type="text"
          v-model="orderForm.petName"
          autofocus
          placeholder="Pet Name"
          class="inputField"
        />
        <Dropdown
          v-model="orderForm.breed"
          :options="dogBreeds"
          optionLabel="name"
          :filter="true"
          placeholder="Select Breed"
          :showClear="true"
          class="inputField"
        >
          <template #value="slotProps">
            <div class="breed-item breed-item-value" v-if="slotProps.value">
              <div>{{ slotProps.value.name }}</div>
            </div>
            <span v-else>
              {{ slotProps.placeholder }}
            </span>
          </template>
          <template #option="slotProps">
            <div class="breed-item">
              <div>{{ slotProps.option.name }}</div>
            </div>
          </template>
        </Dropdown>
        <div class="gender-div">
          <span>Gender:</span
          ><ToggleButton
            v-model="orderForm.gender"
            onLabel="Male"
            offLabel="Female"
          />
        </div>
        <div class="description-div">
          <span>Description:</span
          ><Textarea
            v-model="orderForm.description"
            :autoResize="true"
            rows="2"
            cols="20"
          />
        </div>
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
              :class="product._id === orderForm.productId ? 'selected' : ''"
            />
          </article>
        </div>
        <input type="submit" hidden :disabled="isLoading" />
      </form>
    </div>
    <div v-else class="loader-div">
      <FingerprintSpinner
        :animation-duration="1400"
        :size="300"
        color="#ff1d5e"
      />
    </div>
  </div>
</template>

<script>
import { useNotificationStore } from "../store/useNotification";
import { onMounted, reactive, ref } from "vue";
import { useUserStore } from "../store/useUser";
import { storeToRefs } from "pinia";
import productService from "../services/productService";
import { FingerprintSpinner } from "epic-spinners";

export default {
  components: {
    FingerprintSpinner,
  },
  setup() {
    const userStore = useUserStore();
    const { loggedUser } = storeToRefs(userStore);
    const notificationStore = useNotificationStore();
    const products = ref(null);
    const orderForm = reactive({
      petName: "",
      image: "",
      breed: null,
      gender: true,
      description: "",
      productId: "",
    });

    const getAvailableProducts = async () => {
      const res = await productService.getAllProducts();
      if (res.error) {
        return notificationStore.newNotification("error", res.error.message);
      }
      products.value = res;
    };

    const selectProduct = (id) => {
      if (orderForm.productId === id) return orderForm.productId=''
      orderForm.productId = id;
    };

    onMounted(() => {
      getAvailableProducts();
    });

    const genderOptions = ref(["Male", "Female"]);
    const dogBreeds = ref([
      { name: "Husky" },
      { name: "German Shepard" },
      { name: "Labrador Retriever" },
      { name: "Golden Retriever" },
      { name: "Bulldog" },
      { name: "Poodle" },
      { name: "Beagle" },
      { name: "Yorkshire Terrier" },
      { name: "Boxer" },
      { name: "Rottweiler" },
    ]);
    
    return {
      orderForm,
      products,
      dogBreeds,
      genderOptions,
      selectProduct,
    };
  },
};
</script>

