import React from 'react'
import Image from 'next/image'
const FifthHomePage = () => {
  return (
    <div className='fifth-home-container'>
      <div className="container">
      <section className='fifth-section-1'>
        <h3>Get a chance to have an
Amazing morning</h3>
<p>We are giving you a one time opportunity to
experience a better life with coffee.</p>
<button>Order Now</button>
      </section>

      <section className='fifth-section-2'>
<Image src="/cup.png" alt='' width={100} height={100} quality={100} className='fifth-light-img'/>
{/* <Image src="/cup-4.svg" alt='' width={100} height={100} quality={100} className='fifth-dark-img'/> */}
      </section>
      </div>
    </div>
  )
}

export default FifthHomePage
