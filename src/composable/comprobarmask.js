const comprobarmask = (currentPic, dataImagenes) => {
   return dataImagenes[currentPic].label == ""
      ? "sin label"
      : dataImagenes[currentPic].label * 1 == 1
      ? "with Mask"
      : "whitout mask";
};

export default comprobarmask;
