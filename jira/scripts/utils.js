//
// Parses Json and makes a table which it adds to the body
// Useful defaul for parsing JSON onto the page
//
function getData (target) {
  $.getJSON(target, function (data) {
    var items = [];
    var headers = "";
    var keyCount = 0;
    $.each(data, function (key, val) {
      var fields = "";
      alert(key + "---" + val + "---" + keyCount);
      if (key=="total") {
        alert("done it")
        $.each(val, function (i, n) {
          // do headers once
          if (items.length < 1) {
            headers += '<th>' + i + '</th>'
          }
          fields += '<td>' + n + '</td>';
        });
      }
      items.push('<tr>' + fields + '</tr>');
      keyCount++;
    });
    // add the header row at the start
    items.unshift('<thead><tr>' + headers + '</tr></thead>');
    $('<table/>', {
        'class': 'sortable',
        html: items.join('')
    }).appendTo('body');
    });
}

function getJiraCount (target,divNameToWriteTo) {
  $.getJSON(target, function (data) {
    var items = [];
    var headers = "";
    $.each(data, function (key, val) {
      var fields = "";
      if (key=="total") {
          headers += '<th>' + key + '</th>'
          fields += '<td>' + val + '</td>';
      }
      items.push('<tr>' + fields + '</tr>');
    });
    // add the header row at the start
    items.unshift('<thead><tr>' + headers + '</tr></thead>');
    $('<table/>', {
        'class': 'sortable',
        html: items.join('')
    }).appendTo(divNameToWriteTo);
    });
}

function getMonday(d) {
  d = new Date(d);
  var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
  return new Date(d.setDate(diff));
}

Date.prototype.getWeek = function() {
        var onejan = new Date(this.getFullYear(), 0, 1);
        return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
    }
//
// Get a the value of specified parameter for the Qstring of the page
//
function getParameterByName(name,defaultVal) {
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if (results == null)
    return defaultVal;
  else
    return decodeURIComponent(results[1].replace(/\+/g, " "));
}

//
// Extend Jscript Date object by adding another Week primitive!
//
Date.prototype.getWeek = function () {
  var onejan = new Date(this.getFullYear(), 0, 1);
  return Math.ceil((((this - onejan) / 86400000) + onejan.getDay() + 1) / 7);
}


function makeSortable() {
    var t = new SortableTable(document.getElementsByTagName("table")[0], 100);
}
