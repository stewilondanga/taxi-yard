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

			var jqueryRow=$(row);
			var jqueryCell = jqueryRow.find('td');
			var arrayText = new Array();
			//generate an array of all the values in the filter columns, in order to consider them all in the filtering process
				$.each(jqueryCell, function(indice, columna){
					arrayText[indice] = $(columna).text().toLowerCase();
				});

			 for(var i=0;i<arrayFilterCriteria.length;i++){
				if(arrayText[i].length==0){
					arrayConditionFilter[i] = true;
				}
				else{
				 if(!(arrayFilterCriteria[i].isEnabled)){
					arrayConditionFilter[i] = true;
				    }
					else{
					if(arrayFilterCriteria[i].criteriaString.length==0){
						arrayConditionFilter[i] = true;
					}
					else{
				arrayConditionFilter[i] =    arrayText[i].indexOf(arrayFilterCriteria[i].criteriaString) === -1 ? false : true;
				      }
				}
			 }
			 }

			 //check if all conditions required are true to show in the results
			 var conditionFilterShowRow=true;
			 for(i=0;i<arrayFilterCriteria.length;i++){
			 conditionFilterShowRow = conditionFilterShowRow && arrayConditionFilter[i];
			 }



		row.style.display =  conditionFilterShowRow ?  'table-row' : 'none' ;



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
								if($(input).is('input[type="text"]')){
								input.oninput = _onInputEvent;
								}
								//dropdownlist column filter
								else if($(input).is('select')){
								input.onchange = _onInputEvent;
								}
								else{

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
				$('body').attr('style','visibility:visible') ;
				/*
				$('#parent').css('visibility', 'hidden').show();
				var w = $('#parent div').width();
				$('#parent').css('visibility', 'visible').hide();
				*/


				})(document);

				$('.gg').on('click', function(e){
				//27th january
				resizeTables();
				  e.stopPropagation();

				  $('#combito').css(
				    {
				      'left': $(this).offset().left,
				      'top': $(this).offset().top + 23
				    }
				  );
				  $('#combito').toggleClass('show');

				  if($('#combito').hasClass('show'))
				    $(this).addClass('gg-activo');
				  else
				    $('.gg').removeClass('gg-activo');
				});

				$(document).on('click', function(){
				  console.log('click en documento')
				  //27th january
				  //resizeTables();
				  $('#combito').removeClass('show');
				  $('.gg').removeClass('gg-activo');
				});





var navigate = (function() {
	$('.dd').toggle();
	$('.dd_btn').click(function() {
		var dataName = $(this).attr('data-name');
		$('.dd').hide();
		$('.' + dataName).toggle();
	});
})();
