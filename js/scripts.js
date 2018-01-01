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



var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
