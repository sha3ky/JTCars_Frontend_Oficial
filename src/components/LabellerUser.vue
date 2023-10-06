<template>
   <div
      style="
         display: flex;
         justify-content: center;
         align-items: center;
         height: 55vh;
      "
   >
      <div class="q-gutter-y-md" style="min-width: 500px">
         <q-card>
            <div class="row">
               <div class="col">
                  <div class="q-pa-md q-gutter-sm">
                     <q-img
                        :src="imageArray"
                        style="height: 180px; max-width: 180px"
                     >
                        <div
                           class="absolute-bottom text-subtitle1 text-center"
                           style="
                              font-size: 1rem;
                              font-weight: 400;
                              line-height: 0.75;
                              letter-spacing: 0.00937em;
                           "
                        >
                           {{ labelDetail }}
                        </div>
                     </q-img>
                  </div>
               </div>
               <div
                  class="col"
                  style="
                     display: flex;
                     align-content: center;
                     align-content: center;
                     flex-wrap: wrap;
                  "
               >
                  <div class="row" style="display: block">
                     <div class="col">Choose a Label:</div>
                     <div class="col" style="display: flex">
                        <div style="display: flex; align-items: center">
                           No Label
                        </div>
                        <q-toggle size="lg" v-model="shape" />
                        <div style="display: flex; align-items: center">
                           With Label
                        </div>
                     </div>
                     <div class="col">Texto : {{ textoLabel }}</div>
                  </div>
               </div>
            </div>
            <div class="row" style="text-align: center">
               <div class="col" style="margin-bottom: 10px">
                  <q-btn
                     color="red"
                     @click="returnLogin()"
                     label="Return"
                     style="margin-right: 20px"
                  />
                  <q-btn
                     color="secondary"
                     @click="leftPicture()"
                     label="Back"
                  />
                  <q-btn
                     color="indigo"
                     @click="rightPicture()"
                     style="margin-left: 20px"
                     label="Next & Save"
                  />
               </div>
            </div>
         </q-card>
      </div>
   </div>
</template>
<script>
import { defineComponent, watch, ref, onMounted } from "vue";
import axios from "axios";

export default defineComponent({
   name: "LabbelerUser",
   props: {
      showLogin: Boolean,
      userId: Number,
      userIsAdmin: Boolean,
   },
   setup(props) {
      const apiUrlWeb = "https://5eb0-37-158-136-4.ngrok-free.app/"
      const api="http://127.0.0.1:8000/"
      let imagenBBDD;
      const textName = ref("");
      const previewUrl = ref("");
      const imageArray = ref("");
      let usuario = ref("");
      let allData = ref([]);
      let dataImagenes;
      let currentPic = 0;
      let labelDetail = ref("");
      let textoLabel = ref("");
      let allUsers = [];
      let shape = ref(false);
      let objToBBDD = {};

      watch(
         () => props.showLogin,
         (newValue, oldValue) => {
            console.log("showLogin changed from", oldValue, "to", newValue);
            // You can perform any other actions here when the prop changes
         }
      );
      onMounted(async () => {
         await getAllData();
         await getAllUsers();
      });
      watch(allData, (newValue, oldValue) => {
         console.log("group changed from", oldValue, "to", newValue);
         if (allData.value.length !=0) {
            if (newValue.length != oldValue.length) {
               currentPic = 0;
               insertValue(allData.value);
            }
         } else {
            deleteAllfields();
         }
      });
      watch(shape, (newValue, oldValue) => {
         if (newValue != "" && newValue != oldValue) {
            console.log("group changed from", oldValue, "to", newValue);
            objToBBDD = {};
            dataImagenes[currentPic] = {
               ...dataImagenes[currentPic], // Copy existing object properties
               label: newValue, // Update the label property
            };
            (objToBBDD.user = dataImagenes[currentPic].user),
               (objToBBDD.id = dataImagenes[currentPic].id),
               (objToBBDD.label = dataImagenes[currentPic].label);
         }
      });
      function deleteAllfields() {
         shape.value = "";
         imageArray.value = "";
         labelDetail.value = "";
         textoLabel.value = "";
      }
      function leftPicture() {
         currentPic =
            (currentPic - 1 + dataImagenes.length) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarMask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
      }

      function rightPicture() {
         currentPic = (currentPic + 1) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarMask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
         shape.value = dataImagenes[currentPic].label;
         if (Object.keys(objToBBDD).length !== 0) {
            updateLabel(objToBBDD.user, objToBBDD.id, objToBBDD.label);
         }
      }

      function insertValue(items) {
         if (items.length != 0) {
            dataImagenes = allData.value;
            shape.value = items[0].label;
            imageArray.value = items[0].imageBase64;
            labelDetail.value = comprobarMask(currentPic, items);
            textoLabel.value = items[0].text;
         } else {
            deleteAllfields();
         }
      }
      function comprobarMask(currentPic, dataImagenes) {
         return dataImagenes[currentPic].label == ""
            ? "sin label"
            : dataImagenes[currentPic].label * 1 == 1
            ? "with Mask"
            : "whiteout mask";
      }
      async function getAllData() {
         try {
            const response = await axios.get(
               `${apiUrlWeb}api/ImageTable/`,
               {}
            );
            let filtered = response.data;
            allData.value = filtered.filter((item) => item.label === "");
            console.log("value array", allData);
         } catch (error) {
            console.error("Error fetching data:", error);
         }
      }
      async function getAllUsers() {
         axios
            .get(`${apiUrlWeb}usuarios/`, {})
            .then((response) => {
               allUsers = response.data;
               console.log("users array", allUsers);
            })
            .catch((error) => {
               console.error("Error fetching data:", error);
            });
      }
      async function updateLabel(userId, pictureId, newLabel) {
         const url = `${apiUrlWeb}api/ImageTable/${pictureId}/`;
         const data = {
            user: userId, // Assuming the server expects this field; remove if not
            label: newLabel ? 1 : 0,
         };
         try {
            const response = await axios.put(url, data);
            console.log("Update successful:", response.data);
            await getAllData();
         } catch (error) {
            console.error("Error updating data:", error);
         }
      }
      function returnLogin() {
         this.$emit("show-login-updated", true);
         this.$emit("user-admin", false);
      }
      return {
         textName,
         imagenBBDD,
         previewUrl,
         allData,
         imageArray,
         usuario,
         labelDetail,
         textoLabel,
         allUsers,
         dataImagenes,
         shape,
         //functions
         leftPicture,
         rightPicture,
         getAllData,
         insertValue,
         getAllUsers,
         comprobarMask,
         updateLabel,
         returnLogin,
      };
   },
});
</script>
