import React from "react"
import Loadable from "react-loadable"
const loader = () => <div>Setting up firebase auth...</div>

const MyLoadableFirebaseAuth = Loadable({
  loader: () => import("../components/SimpleFirebase"),
  loading: loader,
})
export default () => (
  <div>
    <MyLoadableFirebaseAuth />
  </div>
)
