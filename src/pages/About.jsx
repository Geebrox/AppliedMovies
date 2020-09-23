import React from 'react'
import PropTypes from 'prop-types'

import siliconValleyImg from 'assets/images/silicon-valley.png'
import mailImg from 'assets/images/mail.png'
import twitterImg from 'assets/images/twitter.png'
import youttubeImg from 'assets/images/youtube.png'
import linkedinImg from 'assets/images/linkedin.png'
import facebookImg from 'assets/images/facebook.png'

const Icon = ({ img }) => {
  return (
    <div className="cursor-pointer w-12 h-12 overflow-hidden rounded-full hover:shadow-xl m-4">
      <img className="w-full h-full" src={img} alt="Social" />
    </div>
  )
}

Icon.propTypes = {
  img: PropTypes.any.isRequired
}

export const About = () => {
  return (
    <div className="flex w-full flex-col px-4">
      <h1 className="text-center text-4xl font-bold font-playfairDisplay text-light-title my-20">
        Meet Our Team
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <img src={siliconValleyImg} alt="Try to hack!" className="mx-auto" />
        <div className="font-inter text-sm space-y-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam justo
            quam, egestas eget dapibus vestibulum, rhoncus eget elit. Aenean
            tempor odio quis enim finibus, vitae varius augue pulvinar.
            Pellentesque arcu magna, faucibus eget pellentesque at, blandit eget
            lorem. Donec sed mollis arcu. Etiam quis odio tellus. Phasellus
            varius pharetra tincidunt. Pellentesque finibus consectetur lorem
            nec pulvinar. Nulla dolor augue, sollicitudin consectetur suscipit
            ut, maximus a est. Pellentesque nec lacus dictum, semper quam in,
            dapibus nulla. Sed id tortor quis nisi molestie finibus. Vestibulum
            nec turpis ut ligula pellentesque cursus. Phasellus id commodo mi.
            Nulla eu odio eros.
          </p>
          <p>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Maecenas malesuada nulla quis suscipit
            varius. Proin eleifend, purus nec luctus ullamcorper, arcu nibh
            ultricies lacus, sit amet facilisis velit massa sed dolor. Curabitur
            a interdum leo. Suspendisse eu purus non tellus mattis feugiat id
            non mauris. Praesent pharetra bibendum quam vel bibendum. Vestibulum
            quam purus, blandit vitae lectus vel, aliquam scelerisque magna. Ut
            feugiat faucibus eleifend. Duis iaculis tellus eros, vel viverra est
            viverra et. Morbi rutrum ex at efficitur interdum. Suspendisse
            pulvinar bibendum faucibus. Fusce egestas molestie maximus. Mauris
            sit amet elit vitae turpis finibus egestas eu id massa.
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center flex-wrap my-32">
        <Icon img={mailImg} />
        <Icon img={twitterImg} />
        <Icon img={youttubeImg} />
        <Icon img={linkedinImg} />
        <Icon img={facebookImg} />
      </div>
    </div>
  )
}
