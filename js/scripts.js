//Filtering
(function(document) {
  'use strict';

  //27th january

  var ResizeColumnWidths = {
    init: function() {
      this.executeResize();
    },
    executeResize: function() {
      resizeTables();
    }
  }

  //27th january
  ResizeColumnWidths.init();

  //6th january
  var DropDownListValues = {
    init: function() {
      //off is used to do an initial unlinking of events to prevent cross reference of past handlers
      helper_fillvaluesDropDownList();
    }
  };

  //6th january
  //initialization of additional modules
  DropDownListValues.init();





  var LightTableFilter = (function(Arr) {

    var _input;

    function _onInputEvent(e) {
      _input = e.target;
      var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      Arr.forEach.call(tables, function(table) {
        Arr.forEach.call(table.tBodies, function(tbody) {
          Arr.forEach.call(tbody.rows, _filter);
        });
      });
    }

    function _filter(row) {
      var text = row.textContent.toLowerCase(),
        val = _input.value.toLowerCase();

      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row'; //for future decoration with css. Currently is not used by javascript or css
    }

    return {
      init: function() {
        var inputs = document.getElementsByClassName('light-table-filter');
        Arr.forEach.call(inputs, function(input) {
          input.oninput = _onInputEvent;
        });
      }
    };
  })(Array.prototype);

  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      LightTableFilter.init();
    }
  });


  //Yanire


  //21st December Begin
  var LightTableFilterByColumn = (function(Arr) {

    var _input;

    function _onInputEvent(e) {
      e.stopPropagation();
      _input = e.target;
      //	var tables = document.getElementsByClassName(_input.getAttribute('data-table'));
      var tables = $('.search-table').get(0); //$(_input).closest('.search-table').get(0);

      var arrayFilterColumns = $('.filter-table thead tr th'); //	var arrayFilterColumns = $('.filter-table thead input.searchByColumn');
      var arrayFilterCriteria = new Array();
      //generate an array of all the search criteria in the filter criteria textboxes, in order to consider them all in the filtering process
      $.each(arrayFilterColumns, function(indice, columnCriteria) {
        //if cell has a column filter textbox or not
        if ($(columnCriteria).find('.searchByColumn').length > 0) {
          //6th January
          arrayFilterCriteria[indice] = {
            'criteriaString': $(columnCriteria).find('.searchByColumn')[0].value.toLowerCase(),
            'isEnabled': true
          }; //arrayFilterCriteria[indice] = columnCriteria.value.toLowerCase();
        } else {
          arrayFilterCriteria[indice] = {
            'criteriaString': '',
            'isEnabled': false
          }; //arrayFilterCriteria[indice] = columnCriteria.value.toLowerCase();
        }
      });

      $.each(tables.tBodies[0].rows, function(indice, row) {
          var arrayConditionFilter = new Array();

          var jqueryRow = $(row);
          var jqueryCell = jqueryRow.find('td');
          var arrayText = new Array();
          //generate an array of all the values in the filter columns, in order to consider them all in the filtering process
          $.each(jqueryCell, function(indice, columna) {
            arrayText[indice] = $(columna).text().toLowerCase();
          });

          for (var i = 0; i < arrayFilterCriteria.length; i++) {
            if (arrayText[i].length == 0) {
              arrayConditionFilter[i] = true;
            } else {
              if (!(arrayFilterCriteria[i].isEnabled)) {
                arrayConditionFilter[i] = true;
              } else {
                if (arrayFilterCriteria[i].criteriaString.length == 0) {
                  arrayConditionFilter[i] = true;
                } else {
                  arrayConditionFilter[i] = arrayText[i].indexOf(arrayFilterCriteria[i].criteriaString) === -1 ? false : true;
                }
              }
            }
          }

          //check if all conditions required are true to show in the results
          var conditionFilterShowRow = true;
          for (i = 0; i < arrayFilterCriteria.length; i++) {
            conditionFilterShowRow = conditionFilterShowRow && arrayConditionFilter[i];
          }



          row.style.display = conditionFilterShowRow ? 'table-row' : 'none';



        }


      );
      /* Arr.forEach.call(tables, function(table) {
      	Arr.forEach.call(table.tBodies, function(tbody) {
      		Arr.forEach.call(tbody.rows, _filter, columnIndex);
      	});

      }); */


      //function _filter(row, columnIndex) {}
      /*
      function _filter(indice, row) {
       event.stopPropagation();//prevents header parent from triggering actions afterwards
      	var jqueryRow=$(row);
      	var jqueryCell = jqueryRow.find('td');
      var text = jqueryCell.get(columnIndex).text.toLowerCase(), val = _input.value.toLowerCase();
      //	var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();
      //	row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      row.style.display = text.indexOf(val) === -1 ? 'none' : 'table-row';
      */

      //7th January
      helper_fillvaluesDropDownList();

      //27th january
      resizeTables();
    }

    return {
      init: function() {
        //7th January
        var inputs = document.getElementsByClassName('searchByColumn');
        Arr.forEach.call(inputs, function(input) {
          //Must link correct event with DOM object (textbox, select) in order for the filtering to be triggered
          //input textbox column filter
          if ($(input).is('input[type="text"]')) {
            input.oninput = _onInputEvent;
          }
          //dropdownlist column filter
          else if ($(input).is('select')) {
            input.onchange = _onInputEvent;
          } else {

          }

        });

        //test

      }
    };
  })(Array.prototype);

  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      LightTableFilterByColumn.init();



    }
  });



  //21st December End

  //28 January
  //$('body').show();
  //	$('body').attr('style','visibility:hidden') ;
  $('body').attr('style', 'visibility:visible');
  /*
  $('#parent').css('visibility', 'hidden').show();
  var w = $('#parent div').width();
  $('#parent').css('visibility', 'visible').hide();
  */


})(document);

$('.gg').on('click', function(e) {
  //27th january
  resizeTables();
  e.stopPropagation();

  $('#combito').css({
    'left': $(this).offset().left,
    'top': $(this).offset().top + 23
  });
  $('#combito').toggleClass('show');

  if ($('#combito').hasClass('show'))
    $(this).addClass('gg-activo');
  else
    $('.gg').removeClass('gg-activo');
});

$(document).on('click', function() {
  console.log('click en documento')
  //27th january
  //resizeTables();
  $('#combito').removeClass('show');
  $('.gg').removeClass('gg-activo');
});

//PERU - Table Sorting
var stIsIE = /*@cc_on!@*/false;

sorttable = {
  init: function() {
    // quit if this function has already been called
    if (arguments.callee.done) return;
    // flag this function so we don't do the same thing twice
    arguments.callee.done = true;
    // kill the timer
    if (_timer) clearInterval(_timer);

    if (!document.createElement || !document.getElementsByTagName) return;

    sorttable.DATE_RE = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;

    forEach(document.getElementsByTagName('table'), function(table) {
      if (table.className.search(/\bsortable\b/) != -1) {
        sorttable.makeSortable(table);
      }



    });

  },

  makeSortable: function(table) {
    if (table.getElementsByTagName('thead').length == 0) {
      // table doesn't have a tHead. Since it should have, create one and
      // put the first table row in it.
      the = document.createElement('thead');
      the.appendChild(table.rows[0]);
      table.insertBefore(the,table.firstChild);
    }
    // Safari doesn't support table.tHead, sigh
    if (table.tHead == null) table.tHead = table.getElementsByTagName('thead')[0];

    if (table.tHead.rows.length != 1) return; // can't cope with two header rows

    // Sorttable v1 put rows with a class of "sortbottom" at the bottom (as
    // "total" rows, for example). This is B&R, since what you're supposed
    // to do is put them in a tfoot. So, if there are sortbottom rows,
    // for backwards compatibility, move them to tfoot (creating it if needed).
    sortbottomrows = [];
    for (var i=0; i<table.rows.length; i++) {
      if (table.rows[i].className.search(/\bsortbottom\b/) != -1) {
        sortbottomrows[sortbottomrows.length] = table.rows[i];
      }
    }

		if (sortbottomrows) {
	       if (table.tFoot == null) {
	         // table doesn't have a tfoot. Create one.
	         tfo = document.createElement('tfoot');
	         table.appendChild(tfo);
	       }
	       for (var i=0; i<sortbottomrows.length; i++) {
	         tfo.appendChild(sortbottomrows[i]);
	       }
	       delete sortbottomrows;
	     }

	     // work through each column and calculate its type
	     headrow = table.tHead.rows[0].cells;
	     for (var i=0; i<headrow.length; i++) {
	       // manually override the type with a sorttable_type attribute
	       if (!headrow[i].className.match(/\bsorttable_nosort\b/)) { // skip this col
	         mtch = headrow[i].className.match(/\bsorttable_([a-z0-9]+)\b/);
	         if (mtch) { override = mtch[1]; }
	 	      if (mtch && typeof sorttable["sort_"+override] == 'function') {
	 	        headrow[i].sorttable_sortfunction = sorttable["sort_"+override];
	 	      } else {
	 	        headrow[i].sorttable_sortfunction = sorttable.guessType(table,i);
	 	      }
	 	      // make it clickable to sort
	 	      headrow[i].sorttable_columnindex = i;
	 	      headrow[i].sorttable_tbody = table.tBodies[0];
	 	      dean_addEvent(headrow[i],"click", sorttable.innerSortFunction = function(e) {

	 			console.log('test-click header sort');
	           if (this.className.search(/\bsorttable_sorted\b/) != -1) {
	             // if we're already sorted by this column, just
	             // reverse the table, which is quicker
	             sorttable.reverse(this.sorttable_tbody);
	             this.className = this.className.replace('sorttable_sorted',
	                                                     'sorttable_sorted_reverse');
	             this.removeChild(document.getElementById('sorttable_sortfwdind'));
	             sortrevind = document.createElement('span');
	             sortrevind.id = "sorttable_sortrevind";
	             //sortrevind.innerHTML = stIsIE ? '&nbsp<font face="webdings">5</font>' : '&nbsp;&#x25B4;';
	             this.appendChild(sortrevind);
	             return;
	           }
	           if (this.className.search(/\bsorttable_sorted_reverse\b/) != -1) {
	             // if we're already sorted by this column in reverse, just
	             // re-reverse the table, which is quicker
	             sorttable.reverse(this.sorttable_tbody);
	             this.className = this.className.replace('sorttable_sorted_reverse',
	                                                     'sorttable_sorted');
	             this.removeChild(document.getElementById('sorttable_sortrevind'));

							 sortfwdind.id = "sorttable_sortfwdind";
            //sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
            this.appendChild(sortfwdind);
            return;
          }

          // remove sorttable_sorted classes
          theadrow = this.parentNode;
          forEach(theadrow.childNodes, function(cell) {
            if (cell.nodeType == 1) { // an element
              cell.className = cell.className.replace('sorttable_sorted_reverse','');
              cell.className = cell.className.replace('sorttable_sorted','');
            }
          });
          sortfwdind = document.getElementById('sorttable_sortfwdind');
          if (sortfwdind) { sortfwdind.parentNode.removeChild(sortfwdind); }
          sortrevind = document.getElementById('sorttable_sortrevind');
          if (sortrevind) { sortrevind.parentNode.removeChild(sortrevind); }

          this.className += ' sorttable_sorted';
          sortfwdind = document.createElement('span');
          sortfwdind.id = "sorttable_sortfwdind";
          //sortfwdind.innerHTML = stIsIE ? '&nbsp<font face="webdings">6</font>' : '&nbsp;&#x25BE;';
          this.appendChild(sortfwdind);

	        // build an array to sort. This is a Schwartzian transform thing,
	        // i.e., we "decorate" each row with the actual sort key,
	        // sort based on the sort keys, and then put the rows back in order
	        // which is a lot faster because you only do getInnerText once per row
	        row_array = [];
	        col = this.sorttable_columnindex;
	        rows = this.sorttable_tbody.rows;
	        for (var j=0; j<rows.length; j++) {
	          row_array[row_array.length] = [sorttable.getInnerText(rows[j].cells[col]), rows[j]];
	        }
	        /* If you want a stable sort, uncomment the following line */
	        sorttable.shaker_sort(row_array, this.sorttable_sortfunction);
	        /* and comment out this one */
	        //row_array.sort(this.sorttable_sortfunction);

	        tb = this.sorttable_tbody;
	        for (var j=0; j<row_array.length; j++) {
	          tb.appendChild(row_array[j][1]);
	        }

	        delete row_array;

			e.stopPropagation();//test

			return false;
		});
	}
}
},

guessType: function(table, column) {
// guess the type of a column based on its first non-blank row
sortfn = sorttable.sort_alpha;
for (var i=0; i<table.tBodies[0].rows.length; i++) {
	text = sorttable.getInnerText(table.tBodies[0].rows[i].cells[column]);
	if (text != '') {
		if (text.match(/^-?[£$¤]?[\d,.]+%?$/)) {
			return sorttable.sort_numeric;
		}
		// check for a date: dd/mm/yyyy or dd/mm/yy
		// can have / or . or - as separator
		// can be mm/dd as well
		possdate = text.match(sorttable.DATE_RE)
		if (possdate) {
			// looks like a date
			first = parseInt(possdate[1]);
			second = parseInt(possdate[2]);
			if (first > 12) {
				// definitely dd/mm
				return sorttable.sort_ddmm;
			} else if (second > 12) {
				return sorttable.sort_mmdd;
			} else {
				// looks like a date, but we can't tell which, so assume
				// that it's dd/mm (English imperialism!) and keep looking
				sortfn = sorttable.sort_ddmm;
			}
		}
	}
}
return sortfn;
},

getInnerText: function(node) {
// gets the text we want to use for sorting for a cell.
// strips leading and trailing whitespace.
// this is *not* a generic getInnerText function; it's special to sorttable.
// for example, you can override the cell text with a customkey attribute.
// it also gets .value for <input> fields.

if (!node) return "";

hasInputs = (typeof node.getElementsByTagName == 'function') &&
						 node.getElementsByTagName('input').length;


						     if (node.getAttribute("sorttable_customkey") != null) {
						       return node.getAttribute("sorttable_customkey");
						     }
						     else if (typeof node.textContent != 'undefined' && !hasInputs) {
						       return node.textContent.replace(/^\s+|\s+$/g, '');
						     }
						     else if (typeof node.innerText != 'undefined' && !hasInputs) {
						       return node.innerText.replace(/^\s+|\s+$/g, '');
						     }
						     else if (typeof node.text != 'undefined' && !hasInputs) {
						       return node.text.replace(/^\s+|\s+$/g, '');
						     }
						     else {
						       switch (node.nodeType) {
						         case 3:
						           if (node.nodeName.toLowerCase() == 'input') {
						             return node.value.replace(/^\s+|\s+$/g, '');
						           }
						         case 4:
						           return node.nodeValue.replace(/^\s+|\s+$/g, '');
						           break;
						         case 1:
						         case 11:
						           var innerText = '';
						           for (var i = 0; i < node.childNodes.length; i++) {
						             innerText += sorttable.getInnerText(node.childNodes[i]);
						           }
						           return innerText.replace(/^\s+|\s+$/g, '');
						           break;
						         default:
						           return '';
						       }
						     }
						   },

						   reverse: function(tbody) {
						     // reverse the rows in a tbody
						     newrows = [];
						     for (var i=0; i<tbody.rows.length; i++) {
						       newrows[newrows.length] = tbody.rows[i];
						     }
						     for (var i=newrows.length-1; i>=0; i--) {
						        tbody.appendChild(newrows[i]);
						     }
						     delete newrows;
						   },

						   /* sort functions
						      each sort function takes two parameters, a and b
						      you are comparing a[0] and b[0] */

									sort_numeric: function(a,b) {
								    aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
								    if (isNaN(aa)) aa = 0;
								    bb = parseFloat(b[0].replace(/[^0-9.-]/g,''));
								    if (isNaN(bb)) bb = 0;
								    return aa-bb;
								  },
								  sort_alpha: function(a,b) {
								    if (a[0]==b[0]) return 0;
								    if (a[0]<b[0]) return -1;
								    return 1;
								  },
								  sort_ddmm: function(a,b) {
								    mtch = a[0].match(sorttable.DATE_RE);
								    y = mtch[3]; m = mtch[2]; d = mtch[1];
								    if (m.length == 1) m = '0'+m;
								    if (d.length == 1) d = '0'+d;
								    dt1 = y+m+d;
								    mtch = b[0].match(sorttable.DATE_RE);
								    y = mtch[3]; m = mtch[2]; d = mtch[1];
								    if (m.length == 1) m = '0'+m;
								    if (d.length == 1) d = '0'+d;
								    dt2 = y+m+d;
								    if (dt1==dt2) return 0;
								    if (dt1<dt2) return -1;
								    return 1;
								  },
								  sort_mmdd: function(a,b) {
								    mtch = a[0].match(sorttable.DATE_RE);
								    y = mtch[3]; d = mtch[2]; m = mtch[1];
								    if (m.length == 1) m = '0'+m;
								    if (d.length == 1) d = '0'+d;
								    dt1 = y+m+d;
								    mtch = b[0].match(sorttable.DATE_RE);
								    y = mtch[3]; d = mtch[2]; m = mtch[1];
								    if (m.length == 1) m = '0'+m;
								    if (d.length == 1) d = '0'+d;
								    dt2 = y+m+d;
								    if (dt1==dt2) return 0;
								    if (dt1<dt2) return -1;
								    return 1;
								  },

								  shaker_sort: function(list, comp_func) {
								    // A stable sort function to allow multi-level sorting of data
								    // see: http://en.wikipedia.org/wiki/Cocktail_sort
								    // thanks to Joseph Nahmias
								    var b = 0;
								    var t = list.length - 1;
								    var swap = true;


var navigate = (function() {
  $('.dd').toggle();
  $('.dd_btn').click(function() {
    var dataName = $(this).attr('data-name');
    $('.dd').hide();
    $('.' + dataName).toggle();
  });
})();
