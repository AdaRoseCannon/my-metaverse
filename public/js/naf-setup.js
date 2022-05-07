/* global NAF, THREE */
NAF.options.useLerp = false;
NAF.options.updateRate = 16;
NAF.schemas.getComponentsOriginal = NAF.schemas.getComponents;
NAF.schemas.getComponents = (template) => {
  const vectorRequiresUpdate = epsilon => {
    return () => {
      let prev = null;

      return curr => {
        if (prev === null) {
          prev = new THREE.Vector3(curr.x, curr.y, curr.z);
          return true;
        } else if (!NAF.utils.almostEqualVec3(prev, curr, epsilon)) {
          prev.copy(curr);
          return true;
        }

        return false;
      };
    };
  };

  if (!NAF.schemas.hasTemplate("#rig-template")) {
    NAF.schemas.add({
      template: '#rig-template',
      components: [
        {component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {selector: '.avatar-head', component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {selector: '.avatar-head', component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {selector: '.avatar-hand-left', component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {selector: '.avatar-hand-left', component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {selector: '.avatar-hand-right', component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {selector: '.avatar-hand-right', component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {component: 'update-gltf-model', property: 'src'},
        'player-info',
      ]
    });
  }

  if (!NAF.schemas.hasTemplate("#head-template")) {
    NAF.schemas.add({
      template: '#head-template',
      components: [
        {component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {selector: '.avatar-head', component: 'position', requiresNetworkUpdate: vectorRequiresUpdate(0.01)},
        {selector: '.avatar-head', component: 'rotation', requiresNetworkUpdate: vectorRequiresUpdate(1)},
        {selector: '.head-model', component: 'update-gltf-model', property: 'src'},
        'player-info',
      ]
    });
  }

  const components = NAF.schemas.getComponentsOriginal(template);
  return components;
}
