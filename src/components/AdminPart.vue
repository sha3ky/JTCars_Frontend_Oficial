<template>
   <div
      style="
         display: flex;
         justify-content: center;
         align-items: center;
         height: 55vh;
      "
   >
      <div class="q-gutter-y-md" style="max-width: 600px; padding: 5px">
         <q-card>
            <q-tabs
               v-model="tab"
               dense
               class="text-grey"
               active-color="primary"
               indicator-color="primary"
               align="justify"
               narrow-indicator
            >
               <q-tab name="general" label="General" style="" />
               <q-tab name="done" label="Done" style="" />
               <q-tab name="pending" label="Pending" style="" />
            </q-tabs>
            <q-separator />

            <q-tab-panels v-model="tab" animated style="">
               <!-- general tab -->
               <q-tab-panel name="general">
                  <div class="text-h6">Labels:</div>
                  <div class="row">
                     <div class="col">
                        <q-card class="my-card">
                           <div class="q-pa-lg">
                              <q-option-group
                                 v-model="group"
                                 :options="options"
                                 color="green"
                                 type="checkbox"
                              />
                           </div>
                        </q-card>
                     </div>
                     <div class="col">
                        <div class="row">
                           <div class="col" style="margin-left: 50px">
                              <q-input
                                 outlined
                                 v-model="textName"
                                 label="name"
                                 dense
                              />
                           </div>
                           <div class="col" style="text-align: center">
                              <!-- <q-btn color="black" label="ADD" @click="addlabel" /> -->
                              <q-file
                                 outlined
                                 dense
                                 v-model="imagenBBDD"
                                 label="Upload"
                                 @change="previewImage"
                              />
                           </div>
                        </div>
                        <div class="row">
                           <div class="row">
                              <div class="col" style="margin-left: 50px">
                                 <img
                                    v-if="previewUrl"
                                    :src="previewUrl"
                                    alt="Preview"
                                 />
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col" style="text-align: end">
                        <div class="q-pa-lg">
                           <p>Data:</p>
                        </div>
                     </div>
                     <div class="col" style="max-width: 130px">
                        <div class="q-pa-lg">
                           <q-btn
                              color="primary"
                              label="Upload"
                              @click="uploadPicture()"
                           >
                           </q-btn>
                        </div>
                     </div>
                     <div class="col" style="max-width: 130px">
                        <div class="q-pa-lg">
                           <q-btn
                              color="green"
                              label="Download"
                              @click="downloadPicture"
                           />
                        </div>
                     </div>
                  </div>
               </q-tab-panel>
               <!-- general tab -->
               <q-tab-panel name="done">
                  <div class="text-h6">Done</div>
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
                     <div class="col">
                        <div class="row" style="display: block">
                           <div class="col">
                              Done by:
                              <q-input
                                 outlined
                                 v-model="usuario"
                                 label="Usuario"
                                 dense
                                 disable
                                 readonly
                              />
                           </div>
                           <div class="col">
                              Texto:
                              <q-input
                                 outlined
                                 v-model="textoLabel"
                                 label="Texto"
                                 dense
                                 disable
                                 readonly
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div class="row">
                     <div class="col" style="margin-left: 4%">
                        <q-btn
                           color="secondary"
                           @click="leftPicture()"
                           label="Back"
                        />
                        <q-btn
                           color="accent"
                           @click="rightPicture()"
                           style="margin-left: 20px"
                           label="Next"
                        />
                     </div>
                  </div>
               </q-tab-panel>
               <q-tab-panel name="pending" style="text-align: center">
                  <div class="text-h6">Pending</div>
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
                  </div>
                  <div class="row">
                     <div class="col">
                        <q-btn
                           color="secondary"
                           @click="leftPicture()"
                           label="Back"
                        />
                        <q-btn
                           color="accent"
                           @click="rightPicture()"
                           style="margin-left: 20px"
                           label="Next"
                        />
                     </div>
                  </div>
               </q-tab-panel>
            </q-tab-panels>
            <div class="row">
               <q-btn
                  color="red"
                  @click="returnLogin()"
                  label="Return"
                  style="margin-bottom: 10px; margin-left: 10px"
               />
            </div>
         </q-card>
      </div>
   </div>
</template>

<script>
import { defineComponent, watch, ref, onMounted } from "vue";
import axios from "axios";
import apiLink from "../composable/apiLink";
import fetchUserData from "../composable/users";
import getAllData from "../composable/data";
import comprobarmask from "../composable/comprobarmask";

export default defineComponent({
   name: "AdminPart",
   props: {
      showLogin: Boolean,
      userId: Number,
   },

   setup(props) {
      const link = apiLink;
      const tab = ref("general");
      const group = ref(["1"]);
      const textName = ref("");
      const imagenBBDD = ref("");
      const previewUrl = ref("");
      let documentsCSV = "";
      const imageArray = ref([]);
      let usuario = ref("");
      let dataImagenes = [];
      let currentPic = 0;
      let labelDetail = ref("");
      let textoLabel = ref("");
      const allUsers = ref([]);
      const allData = ref([]);
      const options = [
         { label: "with Mask", value: "1" },
         { label: "without Mask", value: "0" },
         { label: "No specified", value: "" },
      ];

      onMounted(async () => {
         allUsers.value = await fetchUserData();
         allData.value = await getAllData();
      });
      watch(group, (newValue, oldValue) => {
         group.value.shift();
         console.log("group changed from", oldValue, "to", newValue);
      });
      watch(tab, async (newValue, oldValue) => {
         currentPic = 0;
         checkDataAndInsert(newValue);
         console.log("tab changed from", oldValue, "to", newValue);
      });
      function checkDataAndInsert(value) {
         if (allData.value.length === 0) {
            setTimeout(() => checkDataAndInsert(value), 2000);
            return;
         }
         if (value === "done") {
            dataImagenes = allData.value.filter(
               (item) => item.label === "0" || item.label === "1"
            );
         } else if (value === "pending") {
            dataImagenes = allData.value.filter((item) => item.label === "");
         }
         if (dataImagenes && dataImagenes.length > 0) {
            insertValue(dataImagenes);
         } else {
            imageArray.value = [];
            textoLabel.value = "";
            usuario.value = "";
         }
      }

      function leftPicture() {
         if (!dataImagenes[currentPic]) {
            console.error("No data for leftPic", currentPic);
            return;
         }
         currentPic =
            (currentPic - 1 + dataImagenes.length) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarmask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
         usuario.value = allUsers.value.filter(
            (item) => item.id == dataImagenes[currentPic].user
         )[0].nombre;
      }

      function rightPicture() {
         if (!dataImagenes[currentPic]) {
            console.error("No data for rightPic", currentPic);
            return;
         }
         currentPic = (currentPic + 1) % dataImagenes.length;
         imageArray.value = dataImagenes[currentPic].imageBase64;
         labelDetail.value = comprobarmask(currentPic, dataImagenes);
         textoLabel.value = dataImagenes[currentPic].text;
         usuario.value = allUsers.value.filter(
            (item) => item.id == dataImagenes[currentPic].user
         )[0].nombre;
      }

      function insertValue(items) {
         imageArray.value = items[0].imageBase64;
         labelDetail.value = comprobarmask(currentPic, items);
         textoLabel.value = items[0].text;
         usuario.value = allUsers.value.filter(
            (item) => item.id == items[currentPic].user
         )[0].nombre;
      }

      async function uploadPicture() {
         try {
            const imageBlob = await imageUploaded(imagenBBDD.value);
            const data = {
               text: textName.value,
               label: group.value[0],
               imageBase64: imageBlob,
               user: props.userId,
            };
            const response = await axios.post(`${link}api/ImageTable/`, data, {
               headers: {
                  "Content-Type": "application/json",
               },
            });
            console.log("Image uploaded successfully:", response.data);
         } catch (error) {
            console.error("Error uploading picture:", error);
         }
         textName.value = "";
         group.value[0] = 1;
         imagenBBDD.value = "";
         getAllData();
      }

      function downloadPicture() {
         const filteredData = allData.value.filter(
            (item) => item.label === "1"
         );
         const newArray = filteredData.map(
            ({ imageBase64, ...keepAttrs }) => keepAttrs
         );
         documentsCSV = newArray;
         if (documentsCSV) {
            exportToCsv(documentsCSV);
         }
         console.log(documentsCSV);
      }

      function imageUploaded(file) {
         return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = function () {
               const base64String = reader.result.split(",")[1]; // Remove any existing prefix
               const extension = file.name.split(".").pop().toLowerCase();
               const mimeType = `image/${
                  extension === "jfif" ? "jpeg" : extension
               }`;
               const base64WithPrefix = `data:${mimeType};base64,${base64String}`;
               resolve(base64WithPrefix);
            };

            reader.onerror = function (error) {
               reject(error);
            };

            reader.readAsDataURL(file);
         });
      }

      function previewImage() {
         if (imagenBBDD.value) {
            console.log("File selected:", imagenBBDD.value);
            const reader = new FileReader();
            reader.onload = (e) => {
               previewUrl.value = e.target.result;
               console.log("Preview URL:", previewUrl.value);
            };
            reader.readAsDataURL(imagenBBDD.value);
         } else {
            console.log("No file selected");
         }
      }

      function exportToCsv(rows) {
         if (!rows || !rows.length) {
            return;
         }
         const separator = ",";
         const keys = Object.keys(rows[0]);
         const csvData =
            keys.join(separator) +
            "\n" +
            rows
               .map((row) => {
                  return keys
                     .map((k) => {
                        let cell =
                           row[k] === null || row[k] === undefined
                              ? ""
                              : row[k];
                        cell =
                           cell instanceof Date
                              ? cell.toLocaleString()
                              : cell.toString().replace(/"/g, '""');
                        if (cell.search(/("|,|\n)/g) >= 0) {
                           cell = `"${cell}"`;
                        }
                        return cell;
                     })
                     .join(separator);
               })
               .join("\n");

         const blob = new Blob([csvData], {
            type: "text/csv;charset=utf-8;",
         });
         if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, "csvFile");
         } else {
            const link = document.createElement("a");
            if (link.download !== undefined) {
               // Browsers that support HTML5 download attribute
               const url = URL.createObjectURL(blob);
               link.setAttribute("href", url);
               link.setAttribute("download", "csvFile");
               link.style.visibility = "hidden";
               document.body.appendChild(link);
               link.click();
               document.body.removeChild(link);
            }
         }
      }
      function returnLogin() {
         this.$emit("show-login-updated", true);
         this.$emit("user-admin", false);
      }
      return {
         tab,
         group,
         options,
         textName,
         imagenBBDD,
         previewUrl,
         imageArray,
         usuario,
         labelDetail,
         textoLabel,
         dataImagenes,
         allUsers,
         allData,
         //functions
         uploadPicture,
         downloadPicture,
         imageUploaded,
         previewImage,
         exportToCsv,
         leftPicture,
         rightPicture,
         insertValue,
         comprobarmask,
         returnLogin,
      };
   },
});
</script>
