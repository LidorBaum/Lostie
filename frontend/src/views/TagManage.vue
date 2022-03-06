<template>
  <!-- eslint-disable vue/no-multiple-template-root -->
  <div class="tag-manage" v-if="tagObj">
    <div class="tag-info">
      <div class="edit-info-container" v-if="tagFormIsEditingMap.petName">
        <InputText
          id="petName"
          type="text"
          v-model="tagForm.petName"
          placeholder="Pet Name"
          required
          v-on:keyup.enter="() => onSaveChange('petName')"
          v-on:keyup.esc="() => onCancelChange('petName')"
        />
        <SaveCancelBtns
          fieldName="petName"
          @onSave="onSaveChange"
          @onCancel="onCancelChange"
        />
      </div>
      <div v-else>
        <h1>Pet Name: {{ tagObj.petName }}</h1>
        <EditFieldBtn fieldName="petName" @onEditField="onEditField" />
      </div>

      <div class="edit-info-container" v-if="tagFormIsEditingMap.breed">
        <Dropdown
          v-model="tagForm.breed"
          :options="dogBreeds"
          optionLabel="name"
          :filter="true"
          placeholder="Select Breed"
          :showClear="true"
          class="inputField"
          v-on:keyup.enter="() => onSaveChange('breed')"
          v-on:keyup.esc="() => onCancelChange('breed')"
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
        <SaveCancelBtns
          fieldName="breed"
          @onSave="onSaveChange"
          @onCancel="onCancelChange"
        />
      </div>
      <div v-else>
        <h2>Breed: {{ tagObj.breed }}</h2>
        <EditFieldBtn fieldName="breed" @onEditField="onEditField" />
      </div>

      <div class="edit-info-container" v-if="tagFormIsEditingMap.gender">
        <ToggleButton
          v-model="tagForm.gender"
          onLabel="Male"
          offLabel="Female"
        />
        <SaveCancelBtns
          fieldName="gender"
          @onSave="onSaveChange"
          @onCancel="onCancelChange"
        />
      </div>
      <div v-else>
        <h2>Gender: {{ tagObj.gender }}</h2>
        <EditFieldBtn fieldName="gender" @onEditField="onEditField" />
      </div>

      <div class="edit-info-container" v-if="tagFormIsEditingMap.description">
        <Textarea
          v-model="tagForm.description"
          :autoResize="true"
          rows="2"
          cols="20"
        />
        <SaveCancelBtns
          fieldName="description"
          @onSave="onSaveChange"
          @onCancel="onCancelChange"
        />
      </div>
      <div v-else>
        <h2>Description: {{ tagObj.description }}</h2>
        <EditFieldBtn fieldName="description" @onEditField="onEditField" />
      </div>
    </div>
    <div class="tag-scan-preview">
      <TagScan :tagObj="tagObj" />
    </div>
    <div class="tag-infoo"></div>
  </div>

  <div v-else class="loader-div">
    <FingerprintSpinner
      :animation-duration="1300"
      :size="600"
      color="#15b485"
    />
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed, watch } from "vue";
import tagService from "../services/tagService.js";
import { FingerprintSpinner } from "epic-spinners";
import { useRouter, useRoute } from "vue-router";
import { useUserStore } from "../store/useUser";
import { storeToRefs } from "pinia";
import SaveCancelBtns from "../components/SaveCancelBtns.vue";
import EditFieldBtn from "../components/EditFieldBtn.vue";
import TagScan from "./TagScan.vue";
import { useNotificationStore } from "../store/useNotification";

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

    const tagForm = reactive({
      petName: "",
      image:
        "https://res.cloudinary.com/echoshare/image/upload/v1646337100/Lostie/59-590299_transparent-download-husky-dog-silhouette-at-getdrawings-french_a3paqy.png",
      breed: null,
      gender: true,
      description: "",
    });

    //I need to know which fields are currently being edited.
    const getEmptyEditingMap = () => {
      const mapObj = {};
      const keysArray = Object.keys({ ...tagForm });
      keysArray.forEach((key) => (mapObj[key] = false));
      return mapObj;
    };
    const tagFormIsEditingMap = reactive(getEmptyEditingMap());

    const route = useRoute();

    let tagObj = ref(null);

    //Prime's dropdown must get an object with name property for his options,
    //so I need to make sure when edit is pressed it will recieve object in the TagForm.
    //after the saving, I am applying back a string instead of object to the tagForm
    const onEditField = (fieldName) => {
      console.log(tagForm);
      if (typeof tagForm.breed !== "object")
        tagForm.breed = { name: `${tagForm.breed}` };
      console.log(tagForm);
      tagFormIsEditingMap[fieldName] = true;
    };

    const onSaveChange = async (fieldName) => {
      const updatedTagObj = {};
      Object.assign(updatedTagObj, tagObj.value);
      Object.assign(updatedTagObj, { ...tagForm });
      Object.assign(updatedTagObj, { breed: tagForm.breed.name });
      updatedTagObj.gender = updatedTagObj.gender ? "Male" : "Female";
      console.log(updatedTagObj);
      const updatedTag = await tagService.updateTag(updatedTagObj);
      if (updatedTag.error) {
        return notificationStore.newNotification(
          "error",
          updatedTag.error.message
        );
      }
      notificationStore.newNotification("success", "Saved");
      Object.assign(tagObj.value, updatedTag);
      tagFormIsEditingMap[fieldName] = false;
    };

    const onCancelChange = (fieldName) => {
      tagFormIsEditingMap[fieldName] = false;
      if (fieldName === "gender")
        return (tagForm.gender = tagObj.value.gender === "Male");
      tagForm[fieldName] = tagObj.value[fieldName];
    };

    const fetchTagObj = async (tagId) => {
      if (!loggedUser.value) return;
      const tag = await tagService.getTagByIdForScan(tagId);
      //NOTIFICATION ON ERROR !
      tagObj.value = tag;
    };

    const prepareEditInfoForm = () => {
      if (!loggedUser.value) return;
      Object.assign(tagForm, tagObj.value);
      tagForm.gender = tagForm.gender === "Male";
      console.log(tagForm);
      //   console.log(userInfoForm, "userInfoForm");
    };

    userStore.$subscribe((mutation, state) => {
      const tagId = route.params.id;
      fetchTagObj(tagId);
      prepareEditInfoForm();
    });

    onMounted(() => {
      setTimeout(async () => {
        const tagId = route.params.id;
        await fetchTagObj(tagId);
        prepareEditInfoForm();
      }, 1);
    });
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
      tagObj,
      tagForm,
      tagFormIsEditingMap,
      onCancelChange,
      onEditField,
      onSaveChange,
      dogBreeds,
    };
  },
};
</script>
