<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <Button
        class="edit-btn"
        icon="pi pi-pencil"
        @click="onEditField"
        v-tooltip.top="'Edit'"
    />
</template>

<script>
import { computed } from 'vue';

export default {
    props: {
        fieldName: String,
    },
    setup(props, ctx) {
        let fieldName = computed(() => {
            return `${props.fieldName}`;
        });

        function onEditField() {
            console.log('emiting on editing ');
            ctx.emit('onEditField', fieldName.value);
        }

        return {
            fieldName,
            onEditField,
        };
    },
};
</script>
