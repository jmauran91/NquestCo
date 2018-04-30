///

//this.props.message_objects[8].createdAt
//"2018-04-12T23:49:46.869Z"
//this.props.message_objects[9].createdAt
//Fri Apr 13 2018 12:35:27 GMT-0400 (EDT)

class Convert {


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
}

export default Convert;
