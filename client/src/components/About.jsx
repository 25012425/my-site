import React from 'react';

function About() {
  return (
    <div className='flex justify-between items-center'>
      <div className="intro w-2xl">
        <h1 className="text-5xl font-bold">Hi, I am Myeongsim,
        Frontend Web Developer</h1>
        <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>
        <button className="btn btn-error text-white">Download Resume</button>  
      </div>  
      <div className="avatar">
        <div className="w-3xs rounded-full">
          <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
    </div>
  );
}

export default About;
