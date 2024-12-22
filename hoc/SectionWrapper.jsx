import { staggerContainer } from "@/lib/utils"
import styles from "@/styles"
import { motion } from 'framer-motion'


const SectionWrapper = (Component, idName) => function HOC() {
    return (
        <motion.section
            variants={staggerContainer()}
            initial='hidden'
            whileInView='show'
            viewport={{ one: true, amount: 0.25 }}
            className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
        >
            <span className='hash-span' id={idName}>&nbsp;</span>
            <Component />
        </motion.section>
    )
}

export default SectionWrapper