
function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}


function isPalindrome(string) {
  const normalizedString = string.replaceAll(' ', '').toLowerCase();

  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
}

export { checkStringLength, isPalindrome };

function isMeetingWithinWorkHours(workStart, workEnd, meetingStart, meetingDuration) {

  function timeToMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const workStartMinutes = timeToMinutes(workStart);
  const workEndMinutes = timeToMinutes(workEnd);
  const meetingStartMinutes = timeToMinutes(meetingStart);

  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= workStartMinutes &&
         meetingEndMinutes <= workEndMinutes;
}

isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120);     // true
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkHours('14:00', '17:30', '08:0', 90);  // false
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900); // false
