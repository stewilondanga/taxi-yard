//Filtering
(function(document) {
	'use strict';

	//27th january

	var ResizeColumnWidths = {
	init:function(){
			this.executeResize();
		},
		executeResize:function(){
		resizeTables();
		}
	}

	//27th january
	ResizeColumnWidths.init();

	//6th january
var DropDownListValues = {
	init:function(){
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
			var text = row.textContent.toLowerCase(), val = _input.value.toLowerCase();

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
			var arrayFilterCriteria =  new Array();
				//generate an array of all the search criteria in the filter criteria textboxes, in order to consider them all in the filtering process
				$.each(arrayFilterColumns, function(indice, columnCriteria){
					//if cell has a column filter textbox or not
					if($(columnCriteria).find('.searchByColumn').length>0){
					//6th January
					arrayFilterCriteria[indice] = { 'criteriaString' : $(columnCriteria).find('.searchByColumn')[0].value.toLowerCase() , 'isEnabled':true}; //arrayFilterCriteria[indice] = columnCriteria.value.toLowerCase();
				     }
					 else{
						arrayFilterCriteria[indice] = { 'criteriaString' : '', 'isEnabled':false}; //arrayFilterCriteria[indice] = columnCriteria.value.toLowerCase();
					 }
				});

			$.each(tables.tBodies[0].rows, function(indice, row){
			var arrayConditionFilter=new Array();



var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
