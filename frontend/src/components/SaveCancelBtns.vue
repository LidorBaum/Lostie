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
    props: {
        fieldName: String,
    },
    setup(props, ctx) {
        let fieldName = computed(() => {
            return `${props.fieldName}`;
        });
        function onCancel() {
            console.log('emiting the even of cancel change');
            ctx.emit('onCancel', fieldName.value);
        }
        function onSave() {
            console.log('emiting the event of save change');
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
