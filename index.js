import React from 'react';
import {
  asset,
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
  Animated, 
  NativeModules
} from 'react-360';
import Entity from 'Entity';
import AmbientLight from 'AmbientLight';
import PointLight from 'PointLight';
const {AudioModule} = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);

const NORMAL_SCORE = 1 
const MEDIUM_SCORE = 2 
const HIGHT_SCORE = 4

export default class Hello360 extends React.Component {
  // state = {
  //   count: 0
  // }
  // increment = () => { this.setState({ count: this.state.count + 1 }) }

  render() {
    return (
      <View>
        <View style={styles.panel}>
          <VrButton
            style={styles.greetingBox}>
            <Text style={styles.greeting}>
              {`Count: ${'this.props.count'}`}
            </Text>
          </VrButton>
        </View>
      </View>
    );
  }
};


class ModelView extends React.Component {
  state = {
    count: 0
  }
  increment = () => { 
    this.setState({ count: this.state.count + 1 }) 
  }

  rotation = new Animated.Value(0);

  render() {
    return (
      <View>
        {/* <VrButton
          onClick={this.increment}
          style={styles.spaceBox}>
          <Text style={styles.greeting}>
          {`Count: ${this.state.count}`}
          </Text>
          </VrButton> */}
        <AmbientLight intensity={1.0} color={'#ffffff'} />
        <PointLight
          intensity={0.4}
          style={{ transform: [{ translate: [0, 4, -1] }] }}
        />
        <AnimatedEntity
          style={{ transform: [{ rotateY: this.rotation }] }}
          source={{ gltf2: asset('helmet/SciFiHelmet.gltf') }}
        />
      </View>
    );
  }
}

class SuzanneView extends React.Component {
      state = {
        score: 22
      }
  
  rigthShoot = (score) => { 
    AudioModule.playOneShot({
      source: asset('sound/pain1.wav'),
    });
    console.log(score)
    this.setState({ score: this.state.score + score }) 
  }

    render() {
    return (
      <View>
        <AmbientLight intensity={1.0} />
        <PointLight
          intensity={0.4}
          color={'#ffffff'}
        />

      <VrButton
        onClick = {() => {this.rigthShoot(NORMAL_SCORE)}}
      >
        <Entity
          style={{ transform: [{ translate: [0, 0, -10] }] }}
          source={{ gltf2: asset('suzanne/Suzanne.gltf') }}
        />

        <Entity
          style={{ transform: [{ translate: [-4, 0, -10] }] }}
          source={{ gltf2: asset('helmet/SciFiHelmet.gltf') }}
          />
        </VrButton>


        <View>
          {/* <View style={
            {
              transform: [{ translate: [4, 0, -10] }],
              width: 10,
              height: 10,
              backgroundColor: 'green'
            }
          }> */}          
          <Text style={
            {
              transform: [{ translate: [4, 0, -10] }],
              width: 5,
              height: 1,
              fontSize: 0.5,
              backgroundColor: 'red'
            }
          }>
            {`Count: ${this.state.score}`}
          </Text>
        </View>
      </View>

      // </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    // backgroundColor: 'rgba(255, 255, 255, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: 'red',
    borderColor: '#639dda',
    borderWidth: 2,
  },
  greeting: {
    fontSize: 30,
  },
  spaceBox: {
    padding: 0,
    backgroundColor: 'green',
    borderColor: '#639dda',
    borderWidth: 2,
    width: 100,
    height: 50,
  },
  flatSurfacePanel: {
    backgroundColor: 'yellow'
  }
});

AppRegistry.registerComponent('Hello360', () => Hello360);
AppRegistry.registerComponent('ModelView', () => ModelView);
AppRegistry.registerComponent('SuzanneView', () => SuzanneView);