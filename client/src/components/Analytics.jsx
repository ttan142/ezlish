import React from 'react';
import Achive from '../../src/img/achive.png';

const Analytics = () => {
  return (
    
    <div className='h-screen w-full bg-[#0f1e25] py-16 px-8'>
      <div className=' mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={Achive} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#00df9a] font-bold '>ENGLISH IS EASY</p>
          <h1 className='text-white md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Achieving your goal with Ezlish</h1>
          <p className='text-white'>
          Boost your language proficiency and excel in TOEIC and IELTS reading with our comprehensive and personalized test preparation.
          </p>
          <button className='bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
      </div>
    </div>
    
  );
};

export default Analytics;
