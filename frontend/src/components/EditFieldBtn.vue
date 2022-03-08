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
    emits: ['onEditField'],
    props: {
        fieldName: String,
    },
    setup(props, ctx) {
        let fieldName = computed(() => {
            return `${props.fieldName}`;
        });

        function onEditField() {
            ctx.emit('onEditField', fieldName.value);
        }

        return {
            fieldName,
            onEditField,
        };
    },
};
</script>
