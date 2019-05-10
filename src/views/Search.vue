<template>
   <div class="search">
      <div id="first">
         <h1 class="heading_one">Reserve a Room</h1>
         <div id="search_text">
            <p class="label_head">where</p>
            <input class="search_input big" type="text" placeholder="Location" v-model="criteria">
            <br>
            <div style="display: inline-flex;">
               <p class="label_head">when</p>
               <p style="padding-left: 467px;" class="label_head">how many</p>
            </div>
            <br>
            <input class="search_input small" style="margin-left: 60px; " type="text" placeholder="Date">
            <input class="search_input small" type="text" placeholder="Time">
            <input class="search_input small" style="margin-left: 48px; " type="text" placeholder="Guests">
            <button id="search_button" @click="search">Search</button>
         </div>
         
      </div>
    <div id="second">
       </div>
      <Recommended></Recommended>
   </div>
</template>
<script>
   import Recommended from "../components/Recommended";
   export default {
     name: 'search',
       components: {Recommended},
       data() {
       return {
          criteria: ''
       }
     },
   methods: {
      search: function(){    
         this.$router.push({
         name: 'Results',
         params: { criteria: this.criteria }
         })
      }
   }
   }
   
</script>
<style scoped>
   .heading_one{
   font-family: "Rajdhani";
   font-style: normal;
   font-weight: 600;
   font-size: 72px;
   padding-top: 250px;
   line-height: 92px;
   }
   #first{
   background-image: url(../assets/banner/Search.jpg);
   height: 874px;
   width: 100%;
   background-repeat: no-repeat;
   -webkit-background-size: cover;
   -moz-background-size: cover;
   -o-background-size: cover;
   background-size: cover;
   }
    #second{
        height: 760px;  
    }
   #search_text{
   left: 25%;
   text-align: left;
   position: absolute;
   background: #FFFFFF;
   border: 0.25px solid #828282;
   box-sizing: border-box;
   border-radius: 15px;
   width: 1106px; 
   height: 309px;
   }
   .search_input{
   background: #FFFFFF;
   border: 1px solid #828282;
   box-sizing: border-box;
   border-radius: 10px;
   padding-left: 24px;
   font-family: Roboto;
   font-style: normal;
   font-weight: 300;
   font-size: 20px;
   }
   .small{
   height: 47px;
   width: 238px;
   }
   .big{
   width: 765px;
   height: 47px;
   margin-left: 60px;
   }
   .label_head{
   font-family: Roboto;
   font-style: normal;
   font-weight: normal;
   font-size: 24px;
   line-height: 28px;
   text-align: left;
   padding-left: 60px;
   }
   #search_button{
   background: rgba(84, 142, 255, 0.8);
   position: absolute;
   margin-left: 90px;
   border-radius: 5px;
   font-family: Roboto;
   font-style: normal;
   font-weight: 500;
   font-size: 27px;
   text-align: center;
   color: #FFFFFF;
   height: 47px;
   }
   ::placeholder {
   font-family: Roboto;
   font-style: normal;
   font-weight: 300;
   font-size: 20px;
   color: #828282;
   }
   :-ms-input-placeholder { /* Internet Explorer 10-11 */
   font-family: Roboto;
   font-style: normal;
   font-weight: 300;
   font-size: 20px;
   color: #828282;
   }
   ::-ms-input-placeholder { /* Microsoft Edge */
   font-family: Roboto;
   font-style: normal;
   font-weight: 300;
   font-size: 20px;
   color: #828282;
   }
</style>