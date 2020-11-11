<template>
  <div>
    <div class='background' :style="{backgroundImage: `url(${image})`}">
      <div class="text-block">
        <h2>Get in touch with us. We value your feedback!</h2>
      </div>
    </div>
    <div class="row">
      <div class="column left">
        <br>
        <h1> Message Us</h1><br>
        <p><b>Our team at bacellgroup is dedicated to <br>provide our users with the best user experience!</b></p><br>
        <p> Have an enquiry? <br> Would like to find out more?
        <p><br>
        <p>Feel free to write in to us!</p>
      </div>

      <div class="column right">
        <div id=app>
          <form class="form" @submit.prevent="sendEmail">
            <label class="required">Full Name:</label>
            <input required v-model="name" name='name' type="text"/>
            <label class="required">Email:</label>
            <input required v-model='email' name='email' type="email"/><br><br>
            <label class="required">Your message:</label>
            <textarea required v-model='message' name='message' rows="6"></textarea><br>
            <hr>
            <p>Note: Responses may take up to 3 working days.</p>
            <input type="submit" value="Send" onclick="return confirm('Submit form?')">
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import contactus from "@/assets/contactus.jpeg";
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
        emailjs.sendForm('service_nrkshng', 'template_ix21lgu', e.target,
            'user_06GBpdOLGFj2t33M3sW2J', {
              name: this.name,
              email: this.email,
              message: this.message
            });
      } catch (error) {
        console.log({error});
      }
      // Reset form field
      this.name = '';
      this.email = '';
      this.message = '';
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

#app * {
  box-sizing: border-box;
}

#app {
  margin: 20px auto;
  max-width: 500px;
}

label {
  padding: 8px;
  display: inline-block;
  margin: 20px 0 10px;
  width: 35%;
  align-content: left;
  text-align: left;
}

input[type="text"], input[type="email"],
textarea, input[type="submit"] {
  display: inline-block;
  padding: 8px;
  width: 65%;
  border-radius: 10px;
  border: 1px solid #2d3f55;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

input[type="submit"] {
  cursor: pointer;
}

input[type="submit"]:hover {
  background: #2d3f55;
  border: solid 1px #2d3f55;
  color: white;
}

.required:after {
  content: " *";
  color: red;
}

.row {
  display: flex;
}

.column {
  flex: 50%;
}

.left {
  background-color: #F2F3F4;
  text-align: center;
  padding: 30px;
  padding-top: 50px;
}

.right {
  padding: 30px;
}
</style>
