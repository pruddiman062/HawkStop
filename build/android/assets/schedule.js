var modal=Ti.UI.currentWindow,stopid=modal.stopid,regionid=modal.region,data=require("/lib/data"),AppData=new data,config=require("/lib/config"),schedule={stopId:stopid,regionId:regionid,init:function(){var t=Ti.UI.createView({backgroundColor:"#000000",opacity:.6}),i=Ti.UI.createView({height:config.MODAL_HEIGHT,width:config.MODAL_WIDTH,backgroundColor:config.MODAL_BACKGROUND_COLOR,borderRadius:config.MODAL_BORDER_RADIUS,layout:"vertical"});i.addEventListener("click",function(){modal.close()});var e=this.getSchedule();if(currColor="",currColor=e[0]>6&&!e[2]?config.TIME_COLOR_1:e[0]<3||e[2]?config.TIME_COLOR_3:config.TIME_COLOR_2,!e[2]){var o=Ti.UI.createLabel({text:"The shuttle arrives in:",color:config.TIME_COLOR_4,height:"auto",width:"auto",font:config.SCHEDULE_FONT,textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT}),n=Ti.UI.createLabel({text:e[0]+" minutes",color:currColor,height:"auto",width:"auto",font:config.DEFAULT_FONT,textAlign:Ti.UI.TEXT_ALIGNMENT_LEFT});i.add(o),i.add(n)}var r=Ti.UI.createLabel({text:"The following shuttle arrives at: "+e[1],color:config.TIME_COLOR_4,height:"auto",width:"auto",font:config.SCHEDULE_FONT,textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER});i.add(r),modal.add(t),modal.add(i)},getSchedule:function(){var t,e,o,n,r=60,a="",s=new Date,d=s.getHours(),c=s.getMinutes(),g=!0,l=AppData.getSchedule(this.regionId,this.stopId);for(i=0;i<l.length;i++){if(o=l[i].time,n=o.split(":"),t=n[0],e=n[1],t==d&&e>=c){r=e-c,a=l[i+1].time,g=!1;break}if(t==d+1){r=parseInt(e)+(60-c),a=i+1==l.length?l[0].time:l[i+1].time,g=!1;break}}n=a.split(":");var T,p=n[0],_=n[1];return p>12?(p-=12,T="PM"):((p=12)&&(T="PM"),T="AM"),a=g?l[0].time+" AM":p+":"+_+" "+T,[r,a,g]}};schedule.init();