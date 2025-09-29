import React from 'react'
import Link from 'next/link'
import { SiCoffeescript } from "react-icons/si";
const SecondHomepage = () => {
  return (
    <div className='second-home-page container'>
      {/* section 1 */}
      <div className="sub-second-home-page">
<h3>Discover the best coffee</h3>
<p>Bean Scene is a coffee shop that provides you with quality coffee that helps boost your productivity and helps build your mood. Having a cup of coffee is good, but having a cup of real coffee is greater. There is no doubt that you will enjoy this coffee more than others you have ever tasted.</p>
<Link href='/about' className='btn-sub-second'>
    Learn More
</Link>
      </div>
      {/* section 2 */}
      <div className="img-second-home-page">
<SiCoffeescript className='coffee-img'/>
      </div>
    </div>
  )
}

export default SecondHomepage
