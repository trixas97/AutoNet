<template>
    <div class="container">
        <div class="head">
            <h4 class="title">Interfaces</h4>
            <div class="select"><q-select standout v-model="model" :options="options" label="Standout" /></div>           
        </div>
        <div class="data">
            <q-table
                class="table"
                :rows="rows"
                row-key="key"
                hide-pagination
                virtual-scroll
                
            />
        </div>
    </div>
</template>

<script>

import { ref } from 'vue'

export default {
  setup () {
    let rows = [
        {
            key: "key 1",
            value: "value1"
        },
        {
            key: "key 2",
            value: "value2"
        },
                {
            key: "key 1",
            value: "value1"
        },
        {
            key: "key 2",
            value: "value2"
        },
                {
            key: "key 1",
            value: "value1"
        },
        {
            key: "key 2",
            value: "value2"
        },
                {
            key: "key 1",
            value: "value1"
        },
        {
            key: "key 2",
            value: "value2"
        },
                {
            key: "key 1",
            value: "value1"
        }
        // {
        //     key: "key 3",
        //     value: "value3"
        // },
    ]
    return {
      model: ref(null),
      options: [
        'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
      ],
      rows
    }
  }
}

</script>

<style lang="scss" scoped>
    .container {
        display: grid;
        grid-template-rows: 0.25fr 1fr;
        grid-template-areas: 
        "head"
        "data";
        border-bottom: black;

        .head {
            grid-area: head;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-template-areas: 
            "title select";

            .title {
                grid-area: title;
                padding-top: 0.1em;
                padding-left: 0.3em;
                margin: auto 0px auto 0px;

            }

            .select {
                grid-area: select;
                margin: 0px;
                margin: auto 1em auto auto;

                .q-select {
                    width: 15em;
                    margin-top: auto;
                    margin-bottom: auto;
                }
            }

        }


        .data {
            grid-area: data;
            background-color: chartreuse;
            max-height: 100vh;

            .table {
                // min-height: 200px;
                .q-table {
                    background-color: blue;
                }
                max-height: 250px;
                tr th {
                    position: sticky;
                    background-color: blue;
                }
                // .q-table th{
                //      background-color: blue;
                // }
            }

        }
    }
</style>