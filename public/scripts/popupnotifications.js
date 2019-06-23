
function AppendNotifications(details,date)
{
    
    var appendedDetails="<a class=\"dropdown-item\"><b>Reminder</b>, You have task: <b>"+details+" </b> due "+date+"</a>";
    $(".dropdown-menu").prepend(appendedDetails); 
    var divider="<div class=\"dropdown-divider\"></div>";
    $(".dropdown-menu").prepend(divider); 
}

$(document).ready(function () {

    var response="";
    $.ajax(
            { url: "/tasks/findalltask", 
            method: "GET",
            data:{username:$("#username").text()},
            async: false,
            success: function(resp) {
            response=resp;
            }
        }); 
    
    var length=response.length;
    var i;

    var responsenotificationlist="";
        $.ajax(
            { url: "/notification/findnotification", 
            method: "POST",
            data:{username:$("#username").text()},
            async: false,
            success: function(resp) {
                responsenotificationlist=resp;
            }
        })
        
        // Length of notifications popup
        var notificationpopuplength=0;

        for (i=0; i<length;i++)
        {
            var date=response[i].date;
            var descr=response[i].descr;
            var id=response[i].id;
            var todaydate=new Date().toISOString().split('T')[0];
            var k;
            var lengthresponsenotification=responsenotificationlist.length;
            var present=0;
            for (k=0;k<lengthresponsenotification;k++)
            {
                if(responsenotificationlist[k]._id==response[i]._id)
                    present=1;
                if(responsenotificationlist[k].id==response[i].id && responsenotificationlist[k].descr==response[i].descr && responsenotificationlist[k].date==response[i].date )
                    present=1;
            }

            if(date==todaydate && present==0)
            {
                // Sends Mail
                $.ajax(
                    { url: "/notification/addnotification", 
                    method: "POST",
                    data: {
                        descr:descr,
                        id:id,
                        date:date,
                        username:$("#username").text()
                    },
                    success: function(resp) {
                        response=resp;
                    }
                });
                notificationpopuplength+=1
            }
        }
        $.ajax(
            { url: "/notification/findnotification", 
            data:{username:$("#username").text()},
            method: "POST",
            async: false,
            success: function(resp) {
            response=resp;
            }
        })
        length=response.length;
        if(notificationpopuplength==0)
        document.getElementById("notificationid").innerHTML ="";
        else
        document.getElementById("notificationid").innerHTML =notificationpopuplength;
        for (i=0; i<length;i++)
        {
            var details=response[i].descr;
            var date=response[i].date;
            AppendNotifications(details,date);
        }

    
    $('#navbarDropdown').click(function(){
        document.getElementById("notificationid").innerHTML ="";
    });
});