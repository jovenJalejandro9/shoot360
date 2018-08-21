import React from 'react';
import Entity from 'Entity';
import {
  asset,
  VrButton
} from 'react-360';
export default class Boot extends React.Component {
  render() {
    return (
      <VrButton
        onClick={() => { this.props.rigthShoot(this.props.painScore) }}
      >
        <Entity
          style={{ transform: [{ translate: this.props.position }] }}
          source={{ gltf2: asset(this.props.url) }}
        />
      </VrButton>
    )
  }
}
