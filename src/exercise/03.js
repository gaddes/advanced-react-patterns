// Flexible Compound Components
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {Switch} from '../switch'

// 🐨 create your ToggleContext context here
// 📜 https://reactjs.org/docs/context.html#reactcreatecontext
const ToggleContext = React.createContext();
ToggleContext.displayName = 'ToggleContext';

function Toggle({children}) {
  const [on, setOn] = React.useState(false)
  const toggle = () => setOn(!on)

  // 🐨 remove all this 💣 and instead return <ToggleContext.Provider> where
  // the value is an object that has `on` and `toggle` on it.
  return <ToggleContext.Provider value={{ on, toggle }}>{children}</ToggleContext.Provider>;
}

// 🐨 we'll still get the children from props (as it's passed to us by the
// developers using our component), but we'll get `on` implicitly from
// ToggleContext now
// 🦉 You can create a helper method to retrieve the context here. Thanks to that,
// your context won't be exposed to the user
// `const context = React.useContext(ToggleContext)`
// �📜 https://reactjs.org/docs/hooks-reference.html#usecontext
function ToggleOn({children}) {
  const { on } = React.useContext(ToggleContext);
  return on ? children : null
}

// 🐨 do the same thing to this that you did to the ToggleOn component
function ToggleOff({children}) {
  const { on } = React.useContext(ToggleContext);
  return on ? null : children
}

// 🐨 get `on` and `toggle` from the ToggleContext with `useContext`
function ToggleButton(props) {
  // Provide descriptive error message to user if this component is rendered without Context.Provider
  const context = React.useContext(ToggleContext);
  if (!context) throw new Error("This component accesses context but there is no Provider in the tree above. Please ensure you wrap this child component with Toggle.");

  return <Switch on={context.on} onClick={context.toggle} {...props} />
}

// function App() {
//   return (
//     <div>
//       <Toggle>
//         <ToggleOn>The button is on</ToggleOn>
//         <ToggleOff>The button is off</ToggleOff>
//         <div>
//           <ToggleButton />
//         </div>
//       </Toggle>
//     </div>
//   )
// }

// This doesn't work because ToggleContext.Provider is created in Toggle function.
// Attempting to render a child component like ToggleButton without first wrapping
// it with Context.Provider means the component will not have access to our context!
const App = () => <ToggleButton />

export default App

/*
eslint
  no-unused-vars: "off",
*/
