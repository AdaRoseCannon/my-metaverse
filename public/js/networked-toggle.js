/*global AFRAME*/

AFRAME.registerComponent("update-gltf-model", {
  schema: {
    src: {
      type: 'model'
    },
    sync: {
      default: false
    }
  },
  update() {
    if (this.data.src && this.data.sync) {
      this.el.setAttribute('gltf-model', this.data.src);
    }
  }
});

AFRAME.registerComponent("networked-hand-toggle", {
  tick () {
    const session = this.el.sceneEl.xrSession;
    let handCount = 0;
    if (session) for (const inputSource of session.inputSources) {
      if (inputSource.targetRayMode === 'tracked-pointer') {
        handCount++;
      }
    }
    if (handCount >= 2) {
      // Probably some kind of hands so do set up networked
      if (this.isNetworkedWithHands !== true) {
        this.el.removeAttribute('networked');
        this.el.setAttribute('networked', this.el.dataset.networkedHands);
        this.isNetworkedWithHands = true;
      }
    } else {
      if (this.isNetworkedWithHands !== false) {
        this.el.removeAttribute('networked');
        this.el.setAttribute('networked', this.el.dataset.networkedNoHands);
        this.isNetworkedWithHands = false;
      }
    }
  },
  remove () {
    this.el.sceneEl.removeEventListener("enter-vr", this.onEnterXR);
  }
});
