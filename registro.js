/**
 * registro object
 */
var registro = function(selector){
   var data = {}, 
       timer = new Date();

   /**
    * on keypress will log the key with any combination (shift + key, etc)
    * on keydown will log backspace, shift, etc
    */
   $(selector).keypress(function(e){
      var key = e.keyCode;
      record(key);
   })
   .keydown(function(e){
      var key = e.keyCode;
      if (_isBackspace(key)){
         record(key);
      }
   });

   /**
    * resets the timer
    */
   function reset() {
      timer = new Date();
   }

   /**
    * clears all data
    */
   function clear() {
      data = {};
   }

   /**
    * records a new piece of data at the specific time
    * @param mixed - value
    */
   function record(value){
      var key = new Date() - timer;
      if (!data[key]) {
         data[key] = [value];
      }
      else {
         data[key].push(value);
      }
   }
   /**
    * @param writerFunc - function to write with
    */
   function play(updateFunc) {
      for (var time in data) {
         setTimeout((function(time,data){
            return function(){
               data[time].forEach(function(char){
                  var oldVal = $('textarea').val();
                  var newVal = _isBackspace(char) ? oldVal.substring(0, oldVal.length - 1) :  oldVal + String.fromCharCode(char);
                  updateFunc.apply(this, [newVal]);
               });
            }
         })(time,data), time);
      }
   }

   /**
    * checks whether the keycode is backspace
    * @param int - key code
    */
   function _isBackspace(keycode){
      return keycode === 8;
   }

   /**
    * gets all the recordings
    */
   function getAll(){
      return data;
   }

   return {
      reset: reset,
      clear: clear,
      start: reset,
      record: record,
      getAll: getAll,
      play: play
   };
}


