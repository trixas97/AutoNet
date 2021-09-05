<template>
<div class="container">
    <q-table
      class="protocols"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      flat
      bordered
      hide-pagination 
      :pagination="pagination"
    >
    <template v-slot:top>
        <label>Protocols</label>

        <q-space />



        <q-select standout v-model="model" :options="options"  label-color="white" color="teal"  bg-color="blue"/>
      </template>
    </q-table>
    </div>
</template>

<script>
import { ref } from 'vue'
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Option',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: false
  },
  { name: 'calories', align: 'left', label: 'Value', field: 'calories', sortable: false },
//   { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
//   { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
//   { name: 'protein', label: 'Protein (g)', field: 'protein' },
//   { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
//   { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
//   { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
]

const rows = [
{
    name: 'Frozen Yogurt',
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: '14%',
    iron: '1%'
},
{
    name: 'Ice cream sandwich',
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: '8%',
    iron: '1%'
},
{
    name: 'Eclair',
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: '6%',
    iron: '7%'
},
{
    name: 'Cupcake',
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: '3%',
    iron: '8%'
},
{
    name: 'Gingerbread',
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: '7%',
    iron: '16%'
},
{
    name: 'Jelly bean',
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: '0%',
    iron: '0%'
},
{
    name: 'Lollipop',
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: '0%',
    iron: '2%'
},
{
    name: 'Honeycomb',
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: '0%',
    iron: '45%'
},
{
    name: 'Donut',
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: '2%',
    iron: '22%'
},
{
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
},
{
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
},
{
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
},
{
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
},
{
    name: 'KitKat',
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: '12%',
    iron: '6%'
}
]
let options= [
'EIGRP', 'OSPF', 'RIP', 'VTP', 'STP', 'GRE'
]
export default {
  setup () {
    return {
      columns,
      rows,
        pagination: ref({
        rowsPerPage: 0
      }),      
      options,
      model: ref(options[0]),

    }
  }
}
</script>

<style lang="sass">
.protocols
  height: 100%
  width: 100%

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: #e76f51
    color: white

  label
    font-size: 2.2em
    font-weight: bold
  thead tr th
    font-weight: bold
    font-family: "Roboto"
    font-size: 1.2em
    position: sticky
    z-index: 1
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2)
  thead tr:first-child th
    top: 0


  span
    color: white
  &.q-table--loading thead tr:last-child th
    // top: 48px
</style>