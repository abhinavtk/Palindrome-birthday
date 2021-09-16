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
        dateAsStr.day = ""+date.day;
    }
    
    if(date.month < 10){
        dateAsStr.month = '0' + date.month;
    }
    else {
        dateAsStr.month = ""+date.month;
    }
    dateAsStr.year = ""+date.year;
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

function checkLeapYear(year){
  if (year%400===0)
      return true;
  if (year%100===0)
      return false;
  if (year%4 === 0)
      return true;
  return false;
}

function findnextDate(date){
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var daysList = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (month===2){
    if(checkLeapYear(year)){
      if(day > 29){
        day = 1;
        month = 3;
      }
    }
    else{
      if(day > 28){
        day = 1;
        month = 3;
      }
    }
  }
  else {
    if (day > daysList[month-1]){
        day = 1;
        month += 1;
    }
  }
  if(month>12){
     month = 1;
     year += 1;
  }
  var dateObj = {day: day, month: month, year: year};
  return dateObj;
}

function nextPalindrome(date){
  var nextDate = findnextDate(date);
  diff = 0;
  while(true){
    diff++;
    var dateStr = dateAsString(nextDate);
    var list = checkPalindromeForAllDateFormats(dateStr);
    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        return [diff, nextDate];
      }
    }
    nextDate = findnextDate(nextDate);
  }
}

function findPrevDate(date){
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;
  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
  if (day===0){
    if(month===3){
      if(checkLeapYear(year)){
        day = 29;
        month = 2;
      }
      else{
        day= 28;
        month = 2;
      }
    }
    else if(month ===1){
      day = 31;
      month = 12;
      year--;
    }
    else{
      month--;
      day = daysInMonth[month-1];
    }
  }
  var dateObj = {day:day, month:month, year: year};
  return dateObj;
}

function prevPalindrome(date){
  var prevDate = findPrevDate(date);
  diff=0;
  while(true){
    diff++;
    var dateStr = dateAsString(prevDate);
    var list = checkPalindromeForAllDateFormats(dateStr);
    for (let i = 0; i < list.length; i++) {
      if (list[i]) {
        return [diff, prevDate];
      }
    }
    prevDate = findPrevDate(prevDate);
  }
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
        const [diff1, nextDate] = nextPalindrome(dateObj);
        const [diff2, prevDate] = prevPalindrome(dateObj);
        if (diff1<diff2){
          if(diff1===1){
            output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${diff1} day.`;
          }
          else{
            output.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${diff1} days.`;
          }  
        }
        else{
          if(diff2===1){
            output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${diff2} day.`;
          }
          else{
            output.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${diff2} days.`;
          }
        }
    }
    else{
        output.innerText = "Your birthday is Palindrome 🥳🥳";
    }
}

checkBtn.addEventListener('click',clickHandler);