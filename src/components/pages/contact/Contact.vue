<template>
  <div>
    <div class='background' :style="{backgroundImage: `url(${image})`}">
      <div class="text-block">
        <h3>Get in touch with us. We value your feedback!</h3>
        <p>Our team at bacellgroup is dedicated to provide our users with the best user experience.</p>
      </div>
    </div>
    <div id=app>
      <h1>Contact Form</h1>
      <form class="form" @submit.prevent="sendEmail">
        <label>Full Name:</label>
        <input required v-model="name" name='name' type="text"/>
        <label>Email:</label>
        <input required v-model='email' name='email' type="email"/><br><br>
        <label>Your message:</label>
        <textarea required v-model='message' name='message' rows="6"></textarea><br>
        <label></label>
        <input type="submit" value="Send" onclick="return confirm('Submit form?')">
      </form>
    </div>

  </div>

</template>

<script>
import contactus from "@/assets/contactus.jpeg"
import emailjs from 'emailjs-com';

export default {
  data() {
    return {
      image: contactus,
      name: '',
      email: '',
      message: ''
    };
  },
  methods: {
    sendEmail(e) {
      try {
        emailjs.sendForm('service-id', 'template-id', e.target,
            'user-id', {
              name: this.name,
              email: this.email,
              message: this.message
            })
      } catch(error) {
        console.log({error})
      }
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''

    },
  }
};

</script>

<style scoped>

div.background {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #FFFFFF;
  font-size: 20px;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  box-shadow: inset 0 4px 4px rgba(0, 0, 0, 0.25);
  position: relative;
}

.text-block {
  position: absolute;
  color: white;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
}

#app *{
  box-sizing: border-box;
}
#app{
  margin: 20px auto;
  max-width: 500px;
}

label{
  display: inline-block;
  margin: 20px 0 10px;
  width:35%;
  align-content:left;
  text-align: left;
}
input[type="text"], input[type="email"],
textarea, input[type="submit"]{
  display: inline-block;
  padding: 8px;
  width:65%;
}

input[type="submit"] {
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #2d3f55;
  border: solid 1px #2d3f55;
  color:white;
}

</style>
