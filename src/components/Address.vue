<template>
    <div>
        <div class="form-group">
            <label>Unit Number</label>
            <input type="text" class="form-control" :value="unit" @input="addressChanged('1', $event)">
        </div>
        <div class="form-group">
            <label>Street</label>
            <input type="text" class="form-control" :value="street" @input="addressChanged('2', $event)">
        </div>
         <div class="form-group">
            <label>City</label>
            <input type="text" class="form-control" :value="city" @input="addressChanged('3', $event)">
        </div>
    </div>
</template>

<script>
    export default {
        props: ['value'],
        methods: {
            addressChanged(changedPart, event) {
                let address = '';
                if (changedPart == "1") {
                    address = event.target.value + ' ' + this.street + ' ' + this.city;
                } else if(changedPart == "2"){
                    address = this.unit + ' ' + event.target.value + ' ' + this.city;
                } else{
                    address = this.unit + ' ' + this.street + ' ' + event.target.value;
                }
                this.value = address;
                this.$emit('input', this.value);
            }
        },
        computed: {
            unit() {
                return this.value.split(",")[0];
            },
            street() {
                return this.value.split(",")[1];
            },
            city() {
                return this.value.split(",")[2];
            }
        }
    }
</script>