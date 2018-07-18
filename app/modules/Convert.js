///

//this.props.message_objects[8].createdAt
//"2018-04-12T23:49:46.869Z"
//this.props.message_objects[9].createdAt
//Fri Apr 13 2018 12:35:27 GMT-0400 (EDT)

class Convert {


  static returnTime(date){
    var t = date.split('T')[1]
    var ti = t.split('Z')[0]
    var tim = ti.split('.')[0]
    var time = tim.split(':')[0] + ":" + tim.split(':')[1]

    return time;
  }
  static changeDate(date){

    const DAYTABLE = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const MONTHTABLE = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

    var date_string_arr = date.toString().split(' ')
    var new_date_string = ''

    var day = date_string_arr[0]
    var month_text = date_string_arr[1]
    var month = (MONTHTABLE.indexOf(month_text) + 1)
    var date = date_string_arr[2]
    var year = date_string_arr[3]
    var time = date_string_arr[4]
    var zone = date_string_arr[5]

    new_date_string = year + "-";
    new_date_string += month + "-";
    new_date_string += date + "T";
    new_date_string += time + ".500Z"

    return(new_date_string)
  }

  static prettifyDate(date){
    var date_arr = date.toString().split('-')
    var day = date_arr[2].split('T')[0]
    var full = date_arr[1] + "/" + day + "/" + date_arr[0]
    return full
  }


  static isObjEmpty(obj){
        // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // If it isn't an object at this point
    // it is empty, but it can't be anything *but* empty
    // Is it empty?  Depends on your application.
    if (typeof obj !== "object") return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;

  }

  static isArrEmpty(arr){
    if(arr){
      if (typeof arr !== 'undefined' && arr.length > 0) {
        return false
      // the array is defined and has at least one element
      }
      else {
        return true
      }
    }
    else {
      return true
    }
  }

  static isInArr(str, arr){
    for(var i = 0, len = arr.length; i < len; i++){
      if(arr[i] == str){
        return true
      }
    }
    return false
  }

  static isExist(obj){
    if(obj){
      if(typeof obj !== 'undefined' && typeof obj.keys !== 'undefined'){
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  static isStrExist(str){
    if(str){
      if(typeof str !== 'undefined'){
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }


  static isDateANewerThanB(a,b){
    const month = (string) => {
      let month = string.split("-")[1]
      return parseInt(month)
    }
    const year = (string) => {
      let year = string.split("-")[0]
      return parseInt(year)

    }
    const day = (string) => {
      let util = string.split("-")[2]
      let day = util.split("T")[0]
      return parseInt(day)
    }
    const hour = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let hour = new_util.split(":")[0]
      return parseInt(hour)
    }
    const minute = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let minute = new_util.split(":")[1]
      return parseInt(minute)
    }
    const second = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let second = snd_util.split(".")[0]
      return parseInt(second)
    }
    const millisecond = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let millisecond = snd_util.split(".")[1]
      let edited_millisecond = millisecond.split("Z")[0]
      return parseInt(edited_millisecond)
    }

    if(year(a) > year(b)){
      if(month(a) > month(b)){
        if(day(a) > day(b)){
          if(hour(a) > hour(b)){
            if(minute(a) > minute(b)){
              if(second(a) > second(b)){
                if(millisecond(a) > millisecond(b)){
                  return true
                }
                else {
                  return false
                }
              }
              else {
                return false
              }
            }
            else {
              return false
            }
          }
          else {
            return false
          }
        }
        else {
          return false
        }
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }

  static dateSort(arrayToSort, type){
    const month = (string) => {
      let month = string.split("-")[1]
      return parseInt(month)
    }
    const year = (string) => {
      let year = string.split("-")[0]
      return parseInt(year)

    }
    const day = (string) => {
      let util = string.split("-")[2]
      let day = util.split("T")[0]
      return parseInt(day)
    }
    const hour = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let hour = new_util.split(":")[0]
      return parseInt(hour)
    }
    const minute = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let minute = new_util.split(":")[1]
      return parseInt(minute)
    }
    const second = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let second = snd_util.split(".")[0]
      return parseInt(second)
    }
    const millisecond = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let millisecond = snd_util.split(".")[1]
      let edited_millisecond = millisecond.split("Z")[0]
      return parseInt(edited_millisecond)
    }

    function whichIsOlder(obj1, obj2, type){
      var a_file = obj1
      var b_file = obj2
      if(type == 'file'){
        var a = a_file.LastModified
        var b = b_file.LastModified
      }
      if(type == 'msg'){
        var a = a_file.createdAt
        var b = b_file.createdAt
      }
      else if(type == 'note'){
        var a = a_file.createdAt
        var b = b_file.createdAt
      }
      else if(type == 'ping'){
        var a = a_file.createdAt
        var b = b_file.createdAt
      }
      else if(type == 'convo'){
        var a = a_file.props.createdat
        var b = b_file.props.createdat
      }
      if( year(a) > year(b)){
        return a_file
      }
      else if( year(b) > year(a)){
        return b_file
      }
      else {
        if(month(a) > month(b)){
          return a_file
        }
        else if(month(b) > month(a)){
          return b_file
        }
        else {
          if(day(a) > day(b)){
            return a_file
          }
          else if(day(b) > day(a)){
            return b_file
          }
          else {
            if(hour(a) > hour(b)){
              return a_file
            }
            else if(hour(b) > hour(a)){
              return b_file
            }
            else {
              if(minute(a) > minute(b)){
                return a_file
              }
              else if(minute(b) > minute(a)){
                return b_file
              }
              else {
                if(second(a) > second(b)){
                  return a_file
                }
                else if(second(b) > second(a)){
                  return b_file
                }
                else {
                  if(millisecond(a) > millisecond(b)){
                    return a_file
                  }
                  else {
                    return b_file
                  }
                }
              }
            }
          }
        }
      }
    }
    for( var i = arrayToSort.length -1; i >= 0; i--){
      for( var j = 1; j<=i; j++){
        var older = whichIsOlder(arrayToSort[j-1], arrayToSort[j], type)
        if( older == arrayToSort[j-1] ){
          arrayToSort[j-1] = arrayToSort[j]
          arrayToSort[j] = older
        }
      }
    }

    return arrayToSort.reverse()
  }

  static dateSortProjects(arrayToSort){
    const month = (string) => {
      let month = string.split("-")[1]
      return parseInt(month)
    }
    const year = (string) => {
      let year = string.split("-")[0]
      return parseInt(year)

    }
    const day = (string) => {
      let util = string.split("-")[2]
      let day = util.split("T")[0]
      return parseInt(day)
    }
    const hour = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let hour = new_util.split(":")[0]
      return parseInt(hour)
    }
    const minute = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let minute = new_util.split(":")[1]
      return parseInt(minute)
    }
    const second = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let second = snd_util.split(".")[0]
      return parseInt(second)
    }
    const millisecond = (string) => {
      let util = string.split("-")[2]
      let new_util = util.split("T")[1]
      let snd_util = new_util.split(":")[2]
      let millisecond = snd_util.split(".")[1]
      let edited_millisecond = millisecond.split("Z")[0]
      return parseInt(edited_millisecond)
    }

    function whichProjectIsOlder(obj1, obj2){
      var a_file = obj1
      var b_file = obj2
      var a = a_file.updatedAt
      var b = b_file.updatedAt
      if( year(a) > year(b)){
        return a_file
      }
      else if( year(b) > year(a)){
        return b_file
      }
      else {
        if(month(a) > month(b)){
          return a_file
        }
        else if(month(b) > month(a)){
          return b_file
        }
        else {
          if(day(a) > day(b)){
            return a_file
          }
          else if(day(b) > day(a)){
            return b_file
          }
          else {
            if(hour(a) > hour(b)){
              return a_file
            }
            else if(hour(b) > hour(a)){
              return b_file
            }
            else {
              if(minute(a) > minute(b)){
                return a_file
              }
              else if(minute(b) > minute(a)){
                return b_file
              }
              else {
                if(second(a) > second(b)){
                  return a_file
                }
                else if(second(b) > second(a)){
                  return b_file
                }
                else {
                  if(millisecond(a) > millisecond(b)){
                    return a_file
                  }
                  else {
                    return b_file
                  }
                }
              }
            }
          }
        }
      }
    }
    for( var i = arrayToSort.length -1; i >= 0; i--){
      for( var j = 1; j<=i; j++){
        var older = whichProjectIsOlder(arrayToSort[j-1], arrayToSort[j])
        if( older == arrayToSort[j-1] ){
          arrayToSort[j-1] = arrayToSort[j]
          arrayToSort[j] = older
        }
      }
    }

    return arrayToSort.reverse()
  }




}

export default Convert;
