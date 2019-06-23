    var taskcounter=0;
    var listcounter=0;
    // Actual Number used for normal user as limitation
    var tasknumber=0;
    var listnumber=0;
    var ids=[];


    function EditTaskMode(id)
    {
        
        var tid=id[12];
        $("#"+id).parent().parent().children(".fa-save").show();
        $("#"+id).parent().parent().children(".fa-trash").show();
        $("#task"+tid).prop('disabled', false);
        $("#date"+tid).prop('disabled', false);
        $("#"+id).hide();
        event.preventDefault();
        return false;

    }
    
    
    function deleteTask(tid)
    {
        var taskid=tid[2];
        $("#taskdetails"+taskid).empty();
        taskcounter=taskcounter-1;
        tasknumber=tasknumber-1;

        var task= {id:taskid,username:$("#username").text()}
        $.ajax(
            { url: "/tasks/deletetask", 
            method: "POST", 
            data: task ,
            success: function(resp) {
            }
            }); 
            return false;
    }
    
    
        
    function AddTask(tid) {

        if (tasknumber > 4 && $("#type").text()=="N")
        {
            $("#limitAlert").show().delay(200).addClass("in").fadeOut(1000);
            return false;
        }


        var listid=$("#"+tid).parent().parent().parent().attr('id');
        var TaskArea=$("#"+tid).parent().parent().find('#TaskArea');
        var taskDetails=$("#taskdetails").clone(true);
        taskDetails.attr('id',taskDetails.attr('id')+taskcounter.toString());
        taskDetails.find("#task").attr('id',"task"+taskcounter.toString());
        taskDetails.find("#EditTaskMode").attr('id',"EditTaskMode"+taskcounter.toString());
        taskDetails.find("#date").attr('id',"date"+taskcounter.toString());
        taskDetails.find("#done").attr('id',"done"+taskcounter.toString());
        taskDetails.find("#priority").attr('id',"priority"+taskcounter.toString());
        taskDetails.find("#save").attr('id',listid+"s"+taskcounter.toString());
        taskDetails.find("#delete").attr('id',listid+"d"+taskcounter.toString());
        taskDetails.appendTo(TaskArea);


        $("#"+listid+"s"+taskcounter.toString()).show();
        $("#"+listid+"d"+taskcounter.toString()).show();
        $("#task"+taskcounter.toString()).prop('disabled', false);
        $("#date"+taskcounter.toString()).prop('disabled', false);
        $("#EditTaskMode"+taskcounter.toString()).hide();

        $('#'+"priority"+taskcounter).bootstrapToggle({
            on: 'High',
            off: 'Low',
            onstyle:"danger",
            offstyle:"warning",
            size:"small",
            width:"100px",
            height:"17px"
        }
        );
        $('#'+"done"+taskcounter).bootstrapToggle({
            on: 'Done',
            off: 'Pending',
            onstyle:"success",
            offstyle:"primary",
            size:"small",
            width:"100px",
            height:"17px"
        });

        
        var task={
            descr:"",
            done:"",
            priority:"",
            date:"",
            listid : listid,
            id:taskcounter,
            username:$("#username").text()
        }

        $.ajax({
        method: "POST",
        url: "/tasks/createtask",
        data: task,
        success:function(resp) {
            response=resp;
        }
        }); 
        
        taskcounter++;
        tasknumber ++;
        return false;


        
    }

    
    function saveTask(id)
    {
        var taskid=id;
        var task=$("#task"+id[2]).val();
        var date=$("#date"+id[2]).val();

        if(date =="" || task =="")
        {
            $("#emptyinputsAlert").show().delay(200).addClass("in").fadeOut(1000);
            return false;
        }

        var done=$("#done"+id[2]).is(":checked");
        var priority=$("#priority"+id[2]).is(":checked");
        var listid=id[0];
        var id=id[2];
        if(done==true)done="1";
        else done="0";
        if(priority==true)priority="1";
        else priority="0";

        $("#"+taskid).hide();
        $("#EditTaskMode"+id).show();
        $("#"+listid+"d"+id).hide();
        $("#task"+id).prop('disabled', true);
        $("#date"+id).prop('disabled', true);

        var task={
            descr:task,
            done:done,
            priority:priority,
            date:date,
            listid : listid,
            id:id,
            username:$("#username").text()
    }
    $.ajax({
        method: "POST",
        url: "/tasks/modifytask",
        data: task,
        });   
    return false;
    }

    
    $(document).ready(function () {
    
    var responselist="";
        $.ajax(
            { url: "/lists/findlist", 
            method: "GET",
            data:{username:$("#username").text()},
            async: false,
            success: function(resp) {
                responselist=resp;
            }
        });
    var listlength=responselist.length;
    var k;
    for (k=0;k<listlength;k++)
    {
        var descr= responselist[k].title;
        var listid=responselist[k].id;
        var list=$("#list").clone(true);
        list.attr('id',listid);
        list.children(".card").children(".card-header").children(".fa-plus").attr('id',"AddTask"+listid);
        list.children(".card").children(".card-header").children(".fa-remove").attr('id',"DeleteList"+listid);
        list.children(".card").children(".card-header").children(".fa-edit").attr('id',"EditMode"+listid);
        list.children(".card").children(".card-header").children(".form-inline").children(".btn").attr('id',"Save"+listid);
        list.children(".card").children(".card-header").children(".form-inline").children(".form-control").attr('id',"listname"+listid);
        list.appendTo("#AllListsContainer");

        $("#"+"listname"+listid).val(descr);
        if (listid>=listcounter)
        listcounter=Number(listid)+1;
        listnumber++;
    } 
    


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
        for (i=0; i<length;i++)
        {
            var lid=response[i].listid;
            var task=response[i].descr;
            var priority=response[i].priority;
            var date=response[i].date;
            var done=response[i].done;
            var tid=response[i].id;
            
            var TaskArea=$("#AllListsContainer").find("#"+lid).children(".card").children(".list-group");
            var taskDetails=$("#taskdetails").clone(true);
            taskDetails.attr('id',taskDetails.attr('id')+tid);
            taskDetails.find("#task").attr('id',"task"+tid);
            taskDetails.find("#EditTaskMode").attr('id',"EditTaskMode"+tid);
            taskDetails.find("#date").attr('id',"date"+tid);
            taskDetails.find("#done").attr('id',"done"+tid);
            taskDetails.find("#priority").attr('id',"priority"+tid);
            taskDetails.find("#save").attr('id',lid+"s"+tid);
            taskDetails.find("#delete").attr('id',lid+"d"+tid);
            taskDetails.appendTo(TaskArea);

            $('#'+"priority"+tid).bootstrapToggle({
                on: 'High',
                off: 'Low',
                onstyle:"danger",
                offstyle:"warning",
                size:"small",
                width:"100px",
                height:"17px"
            }
            );
            $('#'+"done"+tid).bootstrapToggle({
                on: 'Done',
                off: 'Pending',
                onstyle:"success",
                offstyle:"primary",
                size:"small",
                width:"100px",
                height:"17px"
            });

            
            $("#task"+tid).val(task);
            $("#date"+tid).val(date);
            if(done=="1")$("#done"+tid).bootstrapToggle('on');
            else $("#done"+tid).bootstrapToggle('off');
            if(priority=="1")$("#priority"+tid).bootstrapToggle('on');
            else $("#priority"+tid).bootstrapToggle('off');

            if(tid>=taskcounter)
            taskcounter=Number(tid)+1;
            tasknumber++;
        }
});

