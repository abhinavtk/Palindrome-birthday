const birthDate = document.querySelector("#birth-date");
const checkBtn = document.querySelector('#check-btn');
const output = document.querySelector("#output");

function reverseStr(date){
    var str = date;
    var charList = str.split('');
    var reversedList = charList.reverse();
    var reversedStr = reversedList.join('');
    return reversedStr;
}

function checkPalindrome(date){
    var reversedDate = reverseStr(date);
    return date==reversedDate;  
}

function dateAsString(date){
    var dateAsStr = {day: '', month: '', year: ''};
  
    if(date.day < 10){
        dateAsStr.day = '0' + date.day;
     }
    else {
        dateAsStr.day = date.day.toString();
    }
    
    if(date.month < 10){
        dateAsStr.month = '0' + date.month;
    }
    else {
        dateAsStr.month = date.month.toString();
    }
    dateAsStr.year = date.year.toString();
    return dateAsStr;
  }

  function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
  
    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  }

  function checkPalindromeForAllDateFormats(date) {
    var dateFormatList = getDateInAllFormats(date);
    var palindromeList = [];
  
    for (var i = 0; i < dateFormatList.length; i++) {
      var result = checkPalindrome(dateFormatList[i]);
      palindromeList.push(result);
    }
    return palindromeList;
  }

function clickHandler(){
    var birthStr = birthDate.value;
    if (birthStr != ''){
        var date = birthStr.split('-');
        var yyyy = date[0];
        var mm = date[1];
        var dd = date[2];

        var dateObj = {
        day: Number(dd),
        month: Number(mm),
        year: Number(yyyy)
        };
    }
    var dateStr = dateAsString(dateObj);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (let i = 0; i < list.length; i++) {

      if (list[i]) {
        isPalindrome = true;
        break;
      }
    }
    if (!isPalindrome){
        output.innerText = "Not palindrome";
    }
    else{
        output.innerText = "Palindrome";
    }
}

checkBtn.addEventListener('click',clickHandler);