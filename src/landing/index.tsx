import { Block1 } from './Block1'
import { Block2 } from './Block2'
import { LandingHeader } from './LandingHeader'
import LandingFooter from './LandingFooter/LandingFooter'

const Landing = () => (
  <div>
    <LandingHeader />
    <Block1 />
    <Block2 />
    {/*<Block3 />*/}
    <LandingFooter />
  </div>
)

export default Landing
