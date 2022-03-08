<template>
    <!-- eslint-disable vue/no-multiple-template-root -->
    <Button
        type="submit"
        icon="pi pi-replay"
        form="edit-info-form"
        v-tooltip.top="'Cancel'"
        @click="onCancel"
    />
    <Button
        type="submit"
        icon="pi pi-check-circle"
        form="edit-info-form"
        v-tooltip.top="'Save'"
        @click="onSave"
    />
</template>

<script>
import { ref, computed, reactive } from 'vue';

export default {
    emits: ['onCancel', 'onSave'],
    props: {
        fieldName: String,
    },
    setup(props, ctx) {
        let fieldName = computed(() => {
            return `${props.fieldName}`;
        });
        function onCancel() {
            ctx.emit('onCancel', fieldName.value);
        }
        function onSave() {
            ctx.emit('onSave', fieldName.value);
        }

        return {
            fieldName,
            onCancel,
            onSave,
        };
    },
};
</script>
