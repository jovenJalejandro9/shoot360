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
import Boot from './components/Boot'
const { AudioModule } = NativeModules;
const AnimatedEntity = Animated.createAnimatedComponent(Entity);


const NORMAL_SCORE = 1
const MEDIUM_SCORE = 2
const HIGHT_SCORE = 4

export default class Hello360 extends React.Component {

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


class SuzanneView extends React.Component {
  state = {
    score: 0,
    time: 10,
    pause: false
  }

  rigthShoot = (score) => {
    if (!this.state.pause) {
      AudioModule.playOneShot({
        source: asset('sound/pain1.wav'),
      });
      this.setState({ score: this.state.score + score })
    }
  }

  playAgain = () => {
    this.setState({
      score: 0,
      pause: false,
      time: 5
    })
    this.componentDidMount()
  }

  componentDidMount() {
    const interval = setInterval(() => {
      this.setState({ time: this.state.time - 1 })
      if (this.state.time === 0) {
        clearInterval(interval)
        this.setState({ pause: true })
      };
    }, 1000)
  }

  render() {
    return (
      <View>
        <AmbientLight intensity={1.0} />
        <PointLight
          intensity={0.4}
          color={'#ffffff'}
        />
        <Boot
          rigthShoot={this.rigthShoot}
          position={[0, 0, -10]}
          url={'suzanne/Suzanne.gltf'}
          painScore={HIGHT_SCORE}
        />
        <Boot
          rigthShoot={this.rigthShoot}
          position={[-4, 0, -10]}
          url={'helmet/SciFiHelmet.gltf'}
          painScore={NORMAL_SCORE}
        />

        {!this.state.pause && <View>
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
        </View>}
        {!this.state.pause && <View>
          <Text style={
            {
              transform: [{ translate: [4, -0.5, -10] }],
              width: 5,
              height: 1,
              fontSize: 0.5,
              backgroundColor: 'red'
            }
          }>
            {`Time: ${this.state.time}`}
          </Text>
        </View>}
        {this.state.pause && <View>
          <Text style={
            {
              transform: [{ translate: [0, 5, -9] }],
              width: 5,
              height: 5,
              fontSize: 0.5,
              backgroundColor: 'blue'
            }
          }>
            {`Fin del juego \n`}
            {`Puntuación: ${this.state.score}\n`}
          </Text>
          <VrButton
            onClick={this.playAgain}
          >
            <Text
              style={
                {
                  transform: [{ translate: [0, 5, -9] }],
                  width: 5,
                  height: 1,
                  fontSize: 0.5,
                  backgroundColor: 'green'
                }
              }
            >
              {`Volver a jugar`}
            </Text>
          </VrButton>
        </View>}
      </View>

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
AppRegistry.registerComponent('SuzanneView', () => SuzanneView);