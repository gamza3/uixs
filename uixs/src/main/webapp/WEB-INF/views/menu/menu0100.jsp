<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<%@ include file="../include/html_head.jsp" %>

<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/core@5.10.0/main.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@5.10.0/main.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@5.10.0/main.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/interaction@5.10.0/main.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fullcalendar/vue@5.10.0/dist/main.global.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.11.0/locales/ko.js"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fullcalendar/daygrid@5.10.0/main.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fullcalendar/common@5.10.0/main.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fullcalendar/timegrid@5.10.0/main.min.css">
<style>
.fc-event-time{display: none}
.app-calendar{margin-top: 10px}
.fc-direction-ltr .fc-daygrid-event.fc-event-end:not(.fc-daygrid-dot-event)::after{
	content: ':end';
	display: inline-block;
	position: absolute;
	width: 50px;
	color: black;
	top: 0;
	right: 0;
	text-align: right;
}
.fc-event{font-size: 11px;font-weight: normal;}
</style>
</head>
<body>
	<div class="wrapper" id="v-app">
		<!--header-->
		<%@ include file="../include/header.jsp" %>
		<!--// header-->
		
		<!--container-->
		<div class="container">
            
            <div class="content">
                <div class="content_inner">
                    <div class="tit_area" >
                        <h2 style="">스케쥴러</h2>
                        <div>
                        	<span style="background-color: #3788d8;width: 10px; height: 10px; display: inline-block;"></span>
                        	<span style="font-size:12px">[개인] 스마트뱅킹</span>
                        	<span style="background-color: #008000;width: 10px; height: 10px; display: inline-block;"></span>
                        	<span style="font-size:12px">인터넷뱅킹</span>
                        	<span style="background-color: #ffa500;width: 10px; height: 10px; display: inline-block;"></span>
                        	<span style="font-size:12px">모바일웹뱅킹</span>
                        </div>
                    </div>
                    <full-calendar
                    	ref="calendar"
	                    class="app-calendar"
	                   	:options='calendarOptions'>
		               	<template v-slot:eventContent='arg'>
<!-- 				          	<b>{{ arg.timeText }}</b> -->
				          	<i>{{ arg.event.title }}</i>
				        </template>
	                </full-calendar>
                </div>
            </div>
        </div>
		<!--// container-->
	</div>
	
	
</body>

<script>
var _app = null;
_app = new Vue({
	el: '#v-app',
 	store: _store,
 	mixins: [channelMixin],
 	components: {
 		'FullCalendar': window.FullCalendarVue.default
 	},
	data: function () {
		var app = this;
		return {
			calendarOptions: {
				plugins: [
                    window.FullCalendarDayGrid.default,
                    window.FullCalendarTimeGrid.default,
                    window.FullCalendarInteraction.default,
                ],
                headerToolbar: {
                	left: '',
                	center: 'title',
                	right: 'prev next today',
                	//left: 'dayGridMonth timeGridWeek timeGridDay'
                },
                initialView: 'dayGridMonth',
                //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
                editable: false,
                selectable: true,
                selectMirror: true,
                dayMaxEvents: true,
                weekends: true,
                select: this.handleDateSelect,
                eventClick: this.handleEventClick,
                eventsSet: this.handleEvents,
                eventAdd: null,
                eventChange: this.handleEventChange,
                eventRemove: null,
                contentHeight: 'auto',
                events: function( fetchInfo, successCallback, failureCallback ) {
                	var std = new Date(fetchInfo.start).format('yyyy-MM-dd');
                	var edd = new Date(fetchInfo.end).format('yyyy-MM-dd');
                	
                	uijs.ajaxDef({
                		url: '/work/cal_data',
                		data: {end_date1: encodeURIComponent(std), end_date2: encodeURIComponent(edd)},
                		method: 'GET',
                		callback: function (data) {
                			successCallback(
       	         				data.map(function (item) {
       	         					var event = {
       	         						title: item.request_title,
       	         						start: new Date(item.regdate),
       	         						end: new Date(item.end_date),
       	         						backgroundColor: app.eventColorFromSite[item.site_code],
       	         						borderColor: app.eventColorFromSite[item.site_code]
       	         					}
       	         					return event;
       	         				})
               				);
                		}
                	});
                },
				locale: 'ko'
			},
			currentEvents: [],
			eventColorFromSite: {
				// 인터넷뱅킹
				'PB_W': '#008000',
				// 모바일 웹뱅킹
				'PB_M': '#ffa500',
				// 스마트뱅킹
				'SB_M': '#3788d8',
			}
		}
	},
	created: function () {
		_app = this;
		
		this.app__init();
	},
	methods: {
		handleWeekendsToggle() {
	      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
	    },
	    handleDateSelect(selectInfo) {
	    	return;
	    	
	        let title = prompt('Please enter a new title for your event')
	        let calendarApi = selectInfo.view.calendar

	        calendarApi.unselect() // clear date selection

	        if (title) {
				calendarApi.addEvent({
		            id: createEventId(),
		            title,
		            start: selectInfo.startStr,
		            end: selectInfo.endStr,
		            allDay: selectInfo.allDay
		        })
	        }
      	},
      	handleEventClick(clickInfo) {
      	},
      	handleEvents(events) {
        	this.currentEvents = events
      	},
      	handleMonthChange(events) {
      	}
	},
});
</script>
</html>
