import React from 'react'
import emailjs from 'emailjs-com';
import styles from "./styles.module.css";
import { useRef } from 'react'

const Contact = () => {

    const form=useRef();

    const sendEMail=(e)=>{
        e.preventDefault();
        emailjs.sendForm('service_231qx58','template_q3fi9ul',form.current,'tjjZtcd7U6entFdNp')
        .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
      }

  return (
    <div className={styles.contactContainer} >
        <div className='container'>
            <div className={styles.contact_options}>

             <form ref={form} onSubmit={sendEMail}>

                <h3 className={styles.title}> Contact Us </h3>

                <input type="text" name='name' placeholder='your name' required/>

                <input type="email" name='email' placeholder='your email' required />

                <textarea name="message" placeholder='your message'   rows="7" required></textarea>

                <button type='submit' className={styles.button}>Send your message</button>

             </form>

            </div>
        </div>
    </div>
  )
}

export default Contact