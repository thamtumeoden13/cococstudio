"use client"

import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'

// import { EarthCanvas } from './canvas'
// import { SectionWrapper } from '../hoc'
import styles from "@/styles"
import { cn, slideIn, staggerContainer } from "@/lib/utils"
import { TypewriterEffectSmooth } from "./ui/typewriter-effect"

const Contact = ({ className }: { className?: string }) => {

  const formRef = useRef(null)

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    setForm({ ...form, [name]: value })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoading(true)

    // ugaUp8luB88w0ka3B
    // template_qwrundy
    // service_j6ok8ud

    emailjs.send('service_djy948a', 'template_jd2t2tf',
      {
        from_name: form.name,
        to_name: 'Mr.Vu',
        from_email: form.email,
        to_email: 'ltv.mrvu@gmail.com',
        message: form.message
      },
      'ugaUp8luB88w0ka3B'
    )
      .then(() => {
        setLoading(false)

        alert('Thank you, I will get back to you as soon as possible')

        setForm({
          name: '',
          email: '',
          message: ''
        })
      }, (error: any) => {
        setLoading(false)

        console.log(error)

        alert('Something went wrong')
      })
  }

  return (
    <motion.div
      variants={staggerContainer()}
      className={cn('flex-[0.75] bg-black p-8 rounded-2xl border-white border', className)}
    >
      <p className={styles.sectionSubText}>Get in touch</p>
      {/* <h3 className={styles.sectionHeadText}>Liên Hệ.</h3> */}
      <TypewriterEffectSmooth words={words_1} cursorClassName="bg-primary" />

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className='mt-12 flex flex-col gap-8'
      >
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Tên của bạn
          </span>
          <input
            type='text'
            name='name'
            value={form.name}
            onChange={handleChange}
            placeholder="what's your name?"
            className='bg-tertiary py-4 px-6 
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
        </label>
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Your Email
          </span>
          <input
            type='email'
            name='email'
            value={form.email}
            onChange={handleChange}
            placeholder="what's your email?"
            className='bg-tertiary py-4 px-6 
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
        </label>
        <label className='flex flex-col'>
          <span className='text-white font-medium mb-4'>
            Your Message
          </span>
          <textarea
            rows={7}
            name='message'
            value={form.message}
            onChange={handleChange}
            placeholder="what do you want to say"
            className='bg-tertiary py-4 px-6 
            placeholder:text-primary 
            text-black rounded-lg outline-none border-none font-medium'
          />
        </label>

        <button
          type='submit'
          className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary'
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </motion.div>
  )
}

export default Contact; // SectionWrapper(Contact, 'contact')


const words_1 = [
  {
    text: "LIÊN",
    className: "text-white",
  },
  {
    text: "HỆ",
    className: "text-white",
  },
  {
    text: "VỚI",
    className: "text-white",
  },
  {
    text: "CHÚNG",
    className: "text-primary",
  },
  {
    text: "TÔI.",
    className: "text-primary",
  },
];