const secClock=document.querySelector(".secs");
const minClock=document.querySelector(".mins");
const hoursClock=document.querySelector(".hours");
function turn(){
    /* To get the hours,minutes and second from a Date object */
    let second=new Date().getSeconds(); 
    let minute=new Date().getMinutes();
    let hour=new Date().getHours();

    /*for rotation calculations */

   secClock.style.transform=`rotate(${180+(second*6)}deg)` /*The interior angles sum to 360 degrees. 360/60=6*/

   minClock.style.transform=`rotate(${180+(minute*6)}deg)`
   hoursClock.style.transform=`rotate(${180+(hour*30)}deg)` /*360/12=30 */
  
   /* to check the console
    // console.log({second,minute,hour}) */


}
setInterval(turn,1000); /*In this method we enter the turn and the delay time, 1000, as parameters. 1000 milliseconds is 1 seconds. */