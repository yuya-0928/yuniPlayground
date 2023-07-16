function main() {
  // printFreeBusy('2023-07-18');
  printFreeBusy();
}

function printFreeBusy(inputDate) {
  var date = inputDate ? new Date(inputDate) : new Date();
  if (inputDate) {
    date.setHours(0, 0, 0, 0); // 日付が指定された場合は時間部分を0:00にセット
  }
  var nextDate = new Date(date);
  nextDate.setDate(date.getDate() + 1);
  nextDate.setHours(0, 0, 0, 0);

  var calendarIds = ['calendarId1', 'calendarId2']; // 複数のカレンダーIDを配列で管理
  var busySlots = [];

  calendarIds.forEach(function (calendarId) {
    var calendar = CalendarApp.getCalendarById(calendarId);
    var events = calendar.getEvents(date, nextDate);
    var slots = events.map(function (event) {
      return { start: event.getStartTime(), end: event.getEndTime() };
    });

    busySlots = busySlots.concat(slots);
  })

  var freeSlots = getFreeSlots(busySlots, date, nextDate);

  var totalFreeMinutes = 0;
  freeSlots.forEach(function (slot) {
    var durationMillis = slot.end.getTime() - slot.start.getTime();
    var durationMinutes = durationMillis / (60 * 1000);
    totalFreeMinutes += durationMinutes;
  });

  var freeHours = Math.floor(totalFreeMinutes / 60);
  var freeMinutes = totalFreeMinutes % 60;

  Logger.log((inputDate || '今日') + 'の空き時間：' + freeHours + 'h' + freeMinutes + 'm');
}

function getFreeSlots(busySlots, startOfDay, endOfDay) {
  var freeSlots = [];
  var start = startOfDay;

  busySlots.sort(function (a, b) {
    return a.start.getTime() - b.start.getTime();
  });

  busySlots.forEach(function (slot) {
    if (start < slot.start) {
      freeSlots.push({ start: start, end: slot.start });
    }
    start = slot.end;
  });

  if (start < endOfDay) {
    freeSlots.push({ start: start, end: endOfDay });
  }

  return freeSlots;
}
