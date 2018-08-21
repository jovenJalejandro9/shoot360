import {ReactInstance, Location, Surface} from 'react-360-web';
import * as L from 'lodash'


const VARIABLES = [0, 1, 2]
const MOST_FAR_METERS = 25

function create(r360, who) {

  const coords = [
    L.random(-5, 5),
    L.random(-5, 5),
    -MOST_FAR_METERS
  ]

  const location = new Location(coords)
  let variable = L.sample(VARIABLES)
  let signChanger = L.sample([-1, 1])
  let changeThingsTimeout

  function changeThings() {
    variable = L.sample(VARIABLES)
    signChanger = L.sample([-1, 1])
    clearTimeout(changeThingsTimeout)
    changeThingsTimeout = setTimeout(changeThings, L.random(1, 60) * 1000)
  }

  changeThings()

  const interval = setInterval(() => {
    coords[variable] = coords[variable] + (0.25 * signChanger)
    if (Math.abs(coords[variable]) > MOST_FAR_METERS) {
      changeThings()
    }
    location.setWorldPosition(...coords)
  }, 100)

  r360.renderToLocation(
    r360.createRoot(who),
    location,
  );

}


function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    ...options,
  });

  // create(r360, 'ModelView')
  // create(r360, 'SuzanneView')
  
  // r360.renderToSurface(
  //   r360.createRoot('Hello360', { /* initial props */ }),
  //   r360.getDefaultSurface()
  // );
  r360.renderToLocation(
    r360.createRoot('SuzanneView'),
    r360.getDefaultLocation(),
  );

  r360.compositor.setBackground('./static_assets/360_world.jpg');
}

window.React360 = {init};